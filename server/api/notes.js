const express = require("express");
const router = express.Router();
const { Note, User, UserNote } = require("../db/index");

// Create note
router.post("/", async (req, res, next) => {
  try {
    // Are we sharing the note? If yes add user as guest.
    if (req.body.guestId) {
      const owner = await User.findByToken(req.cookies.token);
      const { noteId, guestId } = req.body;
      const io = req.io;
      const room = guestId;
      // Check if user adding a guest owns the note.
      const verifyOwner = await UserNote.findOne({
        where: { userId: owner.id, noteId: noteId, userType: "owner" },
      });
      if (verifyOwner) {
        const note = await Note.findByPk(noteId);
        const user = await User.findByPk(guestId);
        const verifyExisting = await UserNote.findOne({
          where: { userId: guestId, noteId: noteId, userType: "guest" },
        });
        if (!verifyExisting) {
          await note.addUser(user, { through: { userType: "guest" } });
          io.emit("note-share", room);
          res.json(note);
        } else {
          res.send("user already added");
        }
      } else {
        res.send("Cannot add user to note you do not own.");
      }
    } else if (req.body.title && req.body.content) {
      // If we are not sharing a note, add currently signed in user as owner.
      const user = await User.findByToken(req.cookies.token);
      const note = await Note.create(req.body);
      await note.addUser(user);

      res.json(note);
    }
  } catch (e) {
    next(e);
  }
});
// This was intended to be a delete request however I needed to be able to send in a req.body
router.post("/remove", async (req, res, next) => {
  try {
    const note = await UserNote.findOne({
      where: {
        userId: req.body.guestId,
        noteId: req.body.noteId,
        userType: "guest",
      },
    });
    if (!note) {
      res.send("Note not found");
    }
    await note.destroy();
    res.send("Guest has been removed from the note.");
  } catch (e) {
    next(e);
  }
});

// Delete note. Only possible if you are the owner of the note.
router.delete("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    const { id } = req.body;
    const verifyOwner = await UserNote.findOne({
      where: { userId: user.id, noteId: id, userType: "owner" },
    });
    if (verifyOwner) {
      await Note.destroy({ where: { id: id } });
      res.send("Note deleted successfully");
    } else {
      res.send("You cannot delete this note");
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
// router.post("/add/guest", async (req, res, next) => {
//   try {
//     const { noteId, guestId } = req.body;
//     const note = await Note.findByPk(noteId);
//     const user = await User.findByPk(guestId);
//     await note.addUser(user, { through: { userType: "guest" } });
//     res.json(note);
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;

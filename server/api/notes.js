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
      // Check if user adding a guest owns the note.
      const verifyOwner = await UserNote.findOne({
        where: { userId: owner.id, noteId: noteId, userType: "owner" },
      });
      if (verifyOwner) {
        const note = await Note.findByPk(noteId);
        const user = await User.findByPk(guestId);
        await note.addUser(user, { through: { userType: "guest" } });
        res.json(note);
      } else {
        res.send("Cannot add user to note you do not own.");
      }
    } else {
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

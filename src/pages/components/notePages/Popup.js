import React, { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addNote, removeGuest } from "../../../store/slices/userSlice";
import { useEffect } from "react";
const ShareFriend = ({ friend, setAdd, add, note }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    add.map((e) => {
      if (e.isIn === true && friend.id === e.id) {
        setChecked(true);
      } else if (e.isIn === false && friend.id === e.id) {
        setChecked(false);
      }
    });
  }, []);
  const handleChecked = () => {
    setChecked(!checked);
    if (checked) {
      setAdd(
        add.map((e) => {
          if (e.id === friend.id) {
            return { ...e, isIn: false };
          } else {
            return e;
          }
        })
      );
    } else if (!checked) {
      setAdd(
        add.map((e) => {
          if (e.id === friend.id) {
            return { ...e, isIn: true };
          } else {
            return e;
          }
        })
      );
    }
  };
  return (
    <div>
      <MDBIcon
        className={checked ? "green-check" : null}
        onClick={handleChecked}
        style={{ paddingRight: 20 }}
        far
        icon="check-circle"
      />
      {friend.username}
    </div>
  );
};

export default function Popup({ setPopup, note }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [add, setAdd] = useState(
    user.friends.map((friend) => {
      let isIn = false;
      note.users.forEach((user) => {
        if (user.id === friend.id) {
          isIn = true;
        }
      });
      return { id: friend.id, isIn: isIn };
    })
  );
  const toggleShow = () => setPopup(false);
  const handleShare = async () => {
    if (add.length > 0) {
      await Promise.all(
        add.map((e) => {
          if (e.isIn) {
            dispatch(addNote({ guestId: e.id, noteId: note.id }));
          } else if (!e.isIn) {
            note.users.map((val) => {
              if (val.id === e.id) {
                dispatch(removeGuest({ guestId: e.id, noteId: note.id }));
                setAdd(
                  add.map((user) => {
                    if (user.id === e.id) {
                      return { ...user, isIn: false };
                    } else {
                      return user;
                    }
                  })
                );
              } else {
                return;
              }
            });
          }
        })
      );
    }
    setPopup(false);
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <h5>
          Share With.
          <MDBIcon onClick={toggleShow} fas icon="times" />
        </h5>
        <div className="share-friends">
          {user.friends.length > 0
            ? user.friends.map((e) => {
                return (
                  <ShareFriend
                    key={e.id}
                    add={add}
                    setAdd={setAdd}
                    friend={e}
                    note={note.users}
                  />
                );
              })
            : "No friends to display"}
        </div>
        <button
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            boxShadow: "none",
            backgroundColor: "#cfa616",
            borderRadius: "0 0 9px 9px",
          }}
          className="btn btn-small btn-warning"
          onClick={handleShare}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

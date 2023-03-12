import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import Popup from "./Popup";

export default function SingleNote({ note }) {
  const [popup, setPopup] = useState(false);
  const date = new Date(note.createdAt);
  return (
    <>
      <div
        className={
          note.userNote.userType === "owner"
            ? "single-note"
            : "single-note shared"
        }
      >
        <h5>{note.title}</h5>
        <div>{note.content}</div>
        <footer>
          Created at: {date.toUTCString()}
          {note.userNote.userType === "owner" ? (
            <MDBIcon onClick={() => setPopup(true)} fas icon="ellipsis-v" />
          ) : (
            <MDBIcon fas icon="user-friends" style={{ opacity: 0.7 }} />
          )}
        </footer>
      </div>
      {popup ? <Popup popup={popup} setPopup={setPopup} note={note} /> : null}
    </>
  );
}

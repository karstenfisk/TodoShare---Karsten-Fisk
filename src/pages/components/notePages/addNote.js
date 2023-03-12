import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../../store/slices/userSlice";

export default function AddNote() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ title: title, content: content }));
    setTitle("");
    setContent("");
  };

  return (
    <div className="single-note add-note">
      <form>
        <h5>
          <input
            placeholder="Create New Note..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </h5>
        <div>
          <textarea
            className="add-content"
            placeholder="Note content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <footer>
          <MDBIcon
            onClick={handleSubmit}
            className="submit"
            far
            icon="check-circle"
          />
        </footer>
      </form>
    </div>
  );
}

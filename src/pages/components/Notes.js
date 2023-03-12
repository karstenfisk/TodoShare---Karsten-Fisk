import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleNote from "./notePages/singleNote";
import AddNote from "./notePages/addNote";
import { fetchUser } from "../../store/slices/userSlice";

export default function Notes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  useEffect(() => {
    if (user.status === "invalid") {
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
    }
  }, [user.status]);

  return (
    <div className={"notes"}>
      <h1 style={{ padding: 10, paddingLeft: 30 }}>Notes</h1>
      <div className="notes-container">
        <AddNote />
        {user.user.notes
          ? user.user.notes.map((note) => {
              return <SingleNote key={note.id} note={note} />;
            })
          : "Loading notes"}
      </div>
      <div></div>
    </div>
  );
}

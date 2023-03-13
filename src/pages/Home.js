import Nav from "./components/Nav";
import Notes from "./components/Notes";
import Friends from "./components/Friends";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/slices/userSlice";
import { useEffect } from "react";
import socket from "../socket";

export default function Home({ appRef }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.user.id) {
      socket.emit("makeRoom", { id: user.user.id });
    }
  }, [user.user.id]);

  useEffect(() => {
    socket.on("friend-request", (data) => {
      dispatch(fetchUser());
    });
    socket.on("friend-accept", (data) => {
      dispatch(fetchUser());
    });
    socket.on("note-share", (data) => {
      dispatch(fetchUser());
    });
  }, [socket, dispatch]);
  return (
    <div className="home">
      <Nav />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </div>
  );
}

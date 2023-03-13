import Nav from "./components/Nav";
import Notes from "./components/Notes";
import Friends from "./components/Friends";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import socket from "../socket";

export default function Home({ appRef }) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("friend-request", async (data) => {
      await dispatch(fetchUser());
    });
    socket.on("friend-accept", async (data) => {
      await dispatch(fetchUser());
    });
    socket.on("note-share", async (data) => {
      await dispatch(fetchUser());
    });
  }, [socket]);
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

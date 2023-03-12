import Nav from "./components/Nav";
import Notes from "./components/Notes";
import Friends from "./components/Friends";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connected", () => {
      console.log("signed in");
    });
  }, []);
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

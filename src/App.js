import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { useRef } from "react";

function App() {
  const appRef = useRef(null);
  const sessionAuth = sessionStorage.getItem("auth");
  const localStorageAuth = localStorage.getItem("auth");
  const user = useSelector((state) => state.user);

  return (
    <div className="App" ref={appRef}>
      {sessionAuth || localStorageAuth || user.status === "loggedIn" ? (
        <Home appRef={appRef} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

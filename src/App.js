import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
  const sessionAuth = sessionStorage.getItem("auth");
  const localStorageAuth = localStorage.getItem("auth");
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      {sessionAuth || localStorageAuth || user.status === "loggedIn" ? (
        <Home />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

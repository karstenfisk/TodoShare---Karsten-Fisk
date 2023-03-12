import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { signOut } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch();
  return (
    <nav className="navigation">
      <h5>
        <Link to="/">
          <MDBIcon fas icon="home" size="lg" />
        </Link>
      </h5>
      <h5 style={{ marginTop: -10 }}>
        <Link to="/friends">
          <MDBIcon fas icon="users" size="lg" />
        </Link>
      </h5>
      <h5 style={{ position: "fixed", bottom: 0 }}>
        <MDBIcon
          onClick={() => {
            localStorage.removeItem("auth");
            sessionStorage.removeItem("auth");
            dispatch(signOut());
          }}
          fas
          className="logout"
          icon="sign-out"
          size="lg"
        />
      </h5>
    </nav>
  );
}

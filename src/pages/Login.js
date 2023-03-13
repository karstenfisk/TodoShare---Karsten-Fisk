import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { login, register } from "../store/slices/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [justifyActive, handleJustifyClick] = useState("tab1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (justifyActive === "tab2") {
      //register
      dispatch(
        register({ username: username, password: password, remember: remember })
      );
    } else if (justifyActive === "tab1") {
      //login
      dispatch(
        login({ username: username, password: password, remember: remember })
      );
    }
    setRemember(false);
    setUsername("");
    setPassword("");
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <form id="login">
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ marginTop: -10, marginBottom: 10 }}>
              <MDBCheckbox
                name="flexCheck"
                value="remember"
                id="flexCheckDefault"
                label="Remember me"
                checked={remember}
                onChange={(e) => {
                  setRemember(e.target.checked);
                }}
              />
            </div>
            <MDBBtn className="mb-4 w-100" type="submit" onClick={handleSubmit}>
              Sign in
            </MDBBtn>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <form id="signup">
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ marginTop: -10, marginBottom: 10 }}>
              <MDBCheckbox
                name="flexCheck"
                value="remember"
                id="flexCheckDefault"
                label="Remember me"
                checked={remember}
                onChange={(e) => {
                  setRemember(e.target.checked);
                }}
              />
            </div>

            <MDBBtn className="mb-4 w-100" type="submit" onClick={handleSubmit}>
              Sign up
            </MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import Friend from "./friendPages/Friend";
import Requests from "./friendPages/Requests";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, addFriend } from "../../store/slices/userSlice";

export default function Friends() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const addFriendFunc = (evt) => {
    if (evt === "Enter" || evt.target.id === "add-button") {
      if (query !== "") {
        dispatch(addFriend({ username: query }));
        setQuery("");
      }
    }
  };
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      addFriendFunc("Enter");
    }
  };
  if (user.user.friends) {
    return (
      <div className="notes">
        <h1 style={{ padding: 10, paddingLeft: 30 }}>Friends</h1>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Enter friend username..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
            id="add-input"
          ></input>
          <MDBIcon
            id="add-button"
            onClick={addFriendFunc}
            fas
            icon="user-plus"
            size="lg"
          />
        </div>
        <div className="friends-container">
          <Requests friends={user.user.friends} />
          <ul className="friends">
            {user.user.friends.length > 0 ? (
              user.user.friends.map((user) => {
                if (user.friend.status === "accepted")
                  return <Friend key={user.id} user={user} />;
              })
            ) : (
              <li>No friends added.</li>
            )}
          </ul>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-center">Loading</h1>;
  }
}

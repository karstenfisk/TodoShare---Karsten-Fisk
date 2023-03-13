import { MDBIcon } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriend, rejectFriend } from "../../../store/slices/userSlice";

export default function Requests({ friends }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    friends.map((friend) => {
      if (
        friend.friend.status === "pending" &&
        friend.friend.type === "incoming"
      ) {
        setRequests([...requests, friend]);
      }
    });
  }, [user]);
  const handleReject = (id) => {
    dispatch(rejectFriend({ id: id }));
  };
  const handleAccept = (id) => {
    dispatch(acceptFriend({ id: id }));
  };
  return (
    <div className="requests">
      <h6 style={{ marginTop: -20 }}>Friend Requests</h6>
      <ul>
        {requests.length > 0 ? (
          friends.map((friend) => {
            if (
              friend.friend.status === "pending" &&
              friend.friend.type === "incoming"
            ) {
              return (
                <li key={friend.id} className="friend-request">
                  {friend.username}
                  <div className="req-icons">
                    <MDBIcon
                      className="check"
                      onClick={() => handleAccept(friend.id)}
                      fas
                      icon="check"
                    />
                    <MDBIcon
                      className="times"
                      onClick={() => handleReject(friend.id)}
                      fas
                      icon="times"
                    />
                  </div>
                </li>
              );
            }
          })
        ) : (
          <li className="friend-request">No incoming requests</li>
        )}
      </ul>
    </div>
  );
}

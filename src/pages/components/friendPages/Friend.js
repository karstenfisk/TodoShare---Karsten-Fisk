export default function Friend({ user }) {
  return (
    <li style={{ marginTop: 12 }}>
      <h4 style={{ fontSize: 20, fontWeight: 400 }}>{user.username}</h4>
      <p style={{ opacity: 0.6, fontSize: 12 }}>added on: {user.updatedAt}</p>
    </li>
  );
}

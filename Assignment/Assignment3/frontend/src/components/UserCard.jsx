import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.city}</p>

      <Link className="details-btn" to={`/details/${user.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default UserCard;

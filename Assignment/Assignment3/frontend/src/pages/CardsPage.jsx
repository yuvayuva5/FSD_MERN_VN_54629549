import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";

function CardsPage({ users }) {
  return (
    <div className="container">
      <h1>Users List</h1>

      <div className="card-grid">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>

      <Link to="/" className="btn">Back to Form</Link>
    </div>
  );
}

export default CardsPage;

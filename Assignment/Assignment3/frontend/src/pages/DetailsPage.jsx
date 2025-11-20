import { useParams, Link } from "react-router-dom";

function DetailsPage({ users }) {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));

  if (!user) return <h2>User Not Found</h2>;

  return (
    <div className="container">
      <h1>User Details</h1>

      <div className="details-box">
        <p><strong>Name: </strong>{user.name}</p>
        <p><strong>Age: </strong>{user.age}</p>
        <p><strong>Email: </strong>{user.email}</p>
        <p><strong>City: </strong>{user.city}</p>
      </div>

      <Link className="btn" to="/cards">Back</Link>
    </div>
  );
}

export default DetailsPage;

import { Link } from "react-router-dom";

function UserCard({ user }) {
  const cardStyle = {
    background: "linear-gradient(180deg, #ffffff, #f7f9ff)",
    borderRadius: 16,
    padding: "20px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "transform .15s ease, box-shadow .15s ease",
  };

  const hoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 42px rgba(124,77,255,0.15)",
  };

  return (
    <Link
      to={`/details/${user.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="user-card"
        style={cardStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, cardStyle)
        }
      >
        <h2 style={{ margin: 0, fontSize: 20, color: "#0b1221" }}>{user.name}</h2>
        <p style={{ margin: "6px 0", color: "#556275" }}>Age: {user.age}</p>
        <p style={{ margin: "6px 0", color: "#556275" }}>{user.email}</p>
        <p style={{ margin: "6px 0", color: "#556275" }}>{user.city}</p>
      </div>
    </Link>
  );
}

export default UserCard;

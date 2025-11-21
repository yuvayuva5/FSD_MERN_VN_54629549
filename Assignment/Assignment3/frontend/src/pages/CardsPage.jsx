import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";

function CardsPage({ users }) {
  const pageStyle = {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg,#FFF5F7 0%, #F0F9FF 50%, #F7FFF5 100%)",
    fontFamily: "'Inter', sans-serif",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: 20,
  };

  const btnStyle = {
    display: "inline-block",
    marginTop: 30,
    padding: "12px 18px",
    background: "linear-gradient(90deg,#7C4DFF,#3EE2A0)",
    color: "#fff",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 600,
    letterSpacing: 0.4,
    boxShadow: "0 10px 34px rgba(124,77,255,0.15)",
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: "center", color: "#0b1221" }}>Users List</h1>

      <div style={gridStyle}>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/" style={btnStyle}>Back to Form</Link>
      </div>
    </div>
  );
}

export default CardsPage;

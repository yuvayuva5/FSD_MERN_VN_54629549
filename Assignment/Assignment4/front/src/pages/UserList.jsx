import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    };
    getUsers();
  }, []);

  // styles for list
  const styles = {
    container: {
      maxWidth: 1100,
      margin: "28px auto",
      padding: "0 18px",
      fontFamily: "'Inter', system-ui, Arial",
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
    title: { margin: 0, fontSize: 26, color: "#0b1221" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 18,
    },
    card: {
      background: "linear-gradient(180deg, #ffffff, #fbfbff)",
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
      border: "1px solid rgba(16,24,40,0.04)",
      transition: "transform .14s, box-shadow .14s",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    cardHover: { transform: "translateY(-6px)", boxShadow: "0 20px 40px rgba(15,23,42,0.12)" },
    topRow: { display: "flex", alignItems: "center", gap: 12 },
    avatar: (name) => {
      const initials = (name || "U").split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();
      const bg = "#"+(Math.abs(hashCode(name))%0xFFFFFF).toString(16).padStart(6,"0");
      return {
        width: 56,
        height: 56,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${bg}, #ffffff)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        flexShrink: 0,
      };
    },
    name: { margin: 0, fontSize: 16, color: "#071133" },
    meta: { margin: 0, fontSize: 13, color: "#475569" },
    btn: {
      marginTop: 8,
      padding: "10px 12px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#7C4DFF,#3EE2A0)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      alignSelf: "flex-start",
    }
  };

  // small utility to create consistent color per name
  function hashCode(str = "") {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i) | 0;
    return h;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User List</h1>
      </div>

      <div style={styles.grid}>
        {users.map((user) => (
          <div
            key={user.id}
            style={styles.card}
            onClick={() => {}}
          >
            <div style={styles.topRow}>
              <div style={styles.avatar(user.name)}>{(user.name||"U").split(" ").map(n=>n[0]).slice(0,2).join("").toUpperCase()}</div>

              <div style={{ flex: 1 }}>
                <h3 style={styles.name}>{user.name}</h3>
                <p style={styles.meta}><b>Email:</b> {user.email}</p>
                <p style={styles.meta}><b>Phone:</b> {user.phone}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/user/${user.id}`)}
              style={styles.btn}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;

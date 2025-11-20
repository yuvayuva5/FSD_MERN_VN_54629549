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

  return (
    <div className="container">
      <h1>User List</h1>

      {users.map((user) => (
        <div className="card" key={user.id}>
          <h3>{user.name}</h3>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>

          <button onClick={() => navigate(`/user/${user.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;

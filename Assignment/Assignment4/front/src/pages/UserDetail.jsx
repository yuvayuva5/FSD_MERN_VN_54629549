import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(res.data);
    };
    getUser();
  }, [id]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <div className="card">
        <h2>{user.name}</h2>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>

        <h3>Address</h3>
        <p>{user.address.street}, {user.address.city}</p>

        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default UserDetail;

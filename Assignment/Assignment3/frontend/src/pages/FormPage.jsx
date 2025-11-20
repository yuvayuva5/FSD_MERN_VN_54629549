import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ users, setUsers }) {
  const [form, setForm] = useState({ name: "", age: "", email: "", city: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = { id: users.length + 1, ...form };
    setUsers([...users, newUser]);
    navigate("/cards");
  }

  return (
    <div className="container">
      <h1>User Form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Enter Name" onChange={handleChange} required />
        <input name="age" placeholder="Enter Age" onChange={handleChange} required />
        <input name="email" placeholder="Enter Email" onChange={handleChange} required />
        <input name="city" placeholder="Enter City" onChange={handleChange} required />

        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;

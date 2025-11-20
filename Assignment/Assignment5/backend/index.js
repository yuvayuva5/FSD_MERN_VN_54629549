const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use("/users", userRoutes);

mongoose
  .connect("mongodb+srv://myAtlasDBUser:yuva2004@myatlasclusteredu.wpx5xyd.mongodb.net/?appName=myAtlasClusterEDU")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(4000, () => console.log("Server running on 4000"));
  })
  .catch((err) => console.error("Error connecting:", err));
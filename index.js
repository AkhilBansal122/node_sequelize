const express = require('express');
require('dotenv').config();
const cors =  require('cors');
const app = express();
const PORT = process.env.PORT;
const AdminRoute  = require("./admin/route");
const db = require("./models");

app.use(express.json());
app.use(cors())

app.use("/api/admin",AdminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
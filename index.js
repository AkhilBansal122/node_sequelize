const express = require('express');
require('dotenv').config();
const cors =  require('cors');
const app = express();
const PORT = process.env.PORT;
const AdminRoute  = require("./admin/route");
const AdminBrandRoute = require("./admin/brand/route");
const db = require("./models");
const path = require('path');
app.use(express.json());
app.use(cors())

app.use("/api/admin",AdminRoute);
app.use("/api/admin/brand/",AdminBrandRoute);
app.use('/uploads', express.static('uploads'));
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
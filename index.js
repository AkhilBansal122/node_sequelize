const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors =  require('cors');
const app = express();
const PORT = process.env.PORT;
const AdminRoute  = require("./admin/route");
const AdminBrandRoutes = require("./admin/brand/route");

const AdminBrandRoute = require("./admin/brand/route/index");
const db = require("./models");
const path = require('path');
//app.use(express.json());
app.use(cors())
const multer = require('multer');
const upload = multer(); // Initialize multer for handling multipart/form-data

app.use(upload.array()); // Use multer middleware for parsing multipart/form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin",AdminRoute);
app.use("/api/admin/brand/",AdminBrandRoute);
app.use('/uploads', express.static('uploads'));
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
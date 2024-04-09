const express = require('express');
const app = express();
const cors = require('cors');
const { loginSchema } = require('./admin/schema');

require('dotenv').config();
const joi  = require('joi');
const PORT = process.env.PORT || 3000; // Added default port 3000 if PORT not specified
const AdminRoute = require("./admin/route");
const AdminBrandRoute = require("./admin/brand/route/index");

 
app.use(cors({origin: '*'}));

app.use('/uploads', express.static('uploads')); 

app.use(express.json()) //json allow
 
app.use(express.urlencoded({ extended: true })) //json allow

// Route handling for admin and brand
app.use("/api/admin/", AdminRoute);
app.use("/api/admin/brand/", AdminBrandRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
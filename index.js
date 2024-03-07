const express = require('express');
require('dotenv').config();
const cors =  require('cors');
const app = express();
const PORT = process.env.PORT;
const UserRoute  = require("./route/userRoute");
const { Sequelize } = require('sequelize');
const db = require("./models");
app.use(express.json());
        app.use(cors())
app.use("/api/users",UserRoute);
//db.Contact.sync({force:true})

//db.User.sync({alter:true})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
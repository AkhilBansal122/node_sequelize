const express = require('express');
const router = express.Router();
const {register} = require("../controllers/usersControllers");
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const {authenticateToken}= require("../middleware/authenticateToken");
const {registerValidation,loginValidation,profile} = require("../middleware/Validation");

const app = express();
const PORT = process.env.PORT;
const secreate =process.env.JWT_SECRET_KEY;
const Model = require('../models');
 
const db = require("../models");



const User = db.User;
const Contact = db.Contact;
const CustomerModal = db.Customer;
const ProfileModal = db.Profile;
    router.post("/register",registerValidation,async( req,res)=>{
        try {
        const { first_name, last_name, username, email, password,role  } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            role
          });
    
          res.status(201).json({ message: 'User registered successfully', user });
    
        } catch (error) {
            errormsg="";
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Handle the duplicate entry error here
                errormsg = ('Duplicate entry error:', error.errors[0].message);
              } else {
                // Handle other types of errors
                errormsg = ('Error creating user:', error);
              }
              errormsg = ('Error registering user:', error);
            res.status(500).json({ error: errormsg });
        }     
    });
    router.post("/login",loginValidation,async( req,res)=>{
        try {
        const { email, password  } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const token = jwt.sign({ userId: user.id, email: user.email }, secreate, {
          expiresIn: '1h',
        });
  
    
        res.status(200).json({ token, expiresIn: 3600, userId: user.id,data:user });    
        } catch (error) {
            errormsg="";
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Handle the duplicate entry error here
                errormsg = ('Duplicate entry error:', error.errors[0].message);
              } else {
                // Handle other types of errors
                errormsg = ('Error creating user:', error);
              }
              errormsg = ('Error registering user:', error);
            res.status(500).json({ error: errormsg });

        }     
    });
    
    router.post("/profile",[authenticateToken,profile],async (req,res)=>{
        const userEmail = req.user.email;
       const userdata =await  User.findOne({
            where:{
                email:userEmail
            }
        });
        if (!userdata) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.status(200).json({ message: 'User profile retrieved successfully', userdata });
    });

    router.post('/createrOr',authenticateToken,async(req,res)=>{
        await Contact.create({
            parmanent_address:"parmanent_address",
            current_address:"sdasda",
            User:{
                first_name:"al",
                last_name:'sd',
                email:"dasdas@gmail.com",
                username:'121212',
                password:bcrypt.hash("12345",10)
            }
        },{
            include:[User.contactUser]
        });

        var data = await User.findOne({
            include:{
                Model:Contact
            }
        }).then((result)=>{
            res.json({
                data:result
            });
        }).catch((err)=>{
            res.json({
                error:err
            })
        })
    });

    router.post("/manytomany",async (req,res)=>{

        const amidala = await CustomerModal.create({ username: 'p4dm3', points: 1000 });
        const queen = await ProfileModal.create({ name: 'Queen' });
        await amidala.addProfile(queen, { through: { selfGranted: true } });
        const result = await CustomerModal.findOne({
            where: { username: 'p4dm3' },
            include: ProfileModal
        });
        
        res.json({
            data:result
        })
    });
module.exports =router;
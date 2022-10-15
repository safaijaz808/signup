require("dotenv").config();
require('./config/database').connect();
const bcrypt = require("bcryptjs/dist/bcrypt");
const express= require('express');
//importing the user module
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth.js");


const app= express();

app.use(express.json());

//creating the welcome route here, which is a middleware
app.get('/welcome', auth, (req, res) => {
    res.status(200).send("Welcome!!");
});

//registering the user
app.post('/register', async (req, res) => {
    //registartion logic goes here
    try{

        //getting the user input
        const {Name, email, password} = req.body;

        //validating the user details
        if(!(email && password && Name)) {
            res.status(400). send ("All input is required");

        }

        //now check if the user already exists in the database
        const oldUser =await User.findOne({email}); //match the entered email with the database
        if(oldUser){
            return res.status(409). send("This email is already registered. Please login");
        }

        //encrypt the user password
        encryptedPassword = await bcrypt.hash(password, 10);

        //now create user in the database if the user is new/first time user
        const user = await User.create({
            Name, 
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        //create token now 
        const token = jwt.sign(
            { user_id: user._id, email}, 
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h',
            }
        );

        //save user token
        user.token = token;
        
        //retrun new user
        res.status(201).json(user); //sending user details as json object

    }

    catch(error){
        console.error(error);

    }
});



//login the user
app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our login logic ends here
  });


module.exports= app;
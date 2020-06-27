const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;


const  { getAllUsers, getUserByUsername, createUser} = require('../db')


usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});


usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
  
    res.send({
      users
    });
  });

  
  //Create new user (Require username and password)
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, name } = req.body;
  
    try {
      const userExist = await getUserByUsername(username);
      console.log(userExist);
  
      if (userExist) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }

      if (password.length < 8) {
        next({
          name: 'PasswordLengthError',
          message: 'Password must be at least 8 characters'
        });
      }

     bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword){
     if (err){
       throw err;
     } else {
        createUser({
          username,
          password:hashedPassword,
          name,
          });
        }
      });

      const token = jwt.sign({ 
         username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        name: 'SignupSuccessful',
        message: "Thank you for signing up!",
        token 
      });
    } catch (error) {
      console.error(error);
      const { name, message } = error;
      next({ name, message })
    } 
  });


//Log in the user (Require username and password)
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;


  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  const userExist = await getUserByUsername(username);
  console.log('userexists is ', userExist);

      if (!userExist) {
        next({
          name: 'UserExistsError',
          message: 'Username does not exist'
        });
      }


  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const { id } = user;
    const name = user.name;

    bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
    
    if (err){
      throw err;
    }
       else {
      if (passwordsMatch) {
    
      const token = jwt.sign({ username, name, id }, process.env.JWT_SECRET, { expiresIn: '1w' });

      res.send({ message: "You're logged in!", token, name });

      } else {
        next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
        });
      }
    }
  });
  }
   catch({ name, message }) {
    next({ name, message });
  }
});


usersRouter.post('/test', async (req, res, next) => {
  
  try{

    console.log('here');
    const { token } = req.body;
    const verification = jwt.verify(token, process.env.JWT_SECRET);
    console.log('verification ', verification);

    const userObj ={
      id: verification.id,
      username: verification.username,
      name: verification.name
    }
    
    console.log('userObj is ', userObj);
    
    res.send({
      name: 'VerificationSuccessful',
      message: 'Token is valid, verification is successful',
      userObj
    });

  }
  catch(err){
    console.error("There's been an error verifying user is logged in @ /user/test route. Error: ", err);
    const { name, message } = err;
    next({ name, message });
  }
})

  
module.exports = usersRouter;
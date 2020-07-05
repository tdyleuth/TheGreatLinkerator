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
      const userExists = await getUserByUsername(username);
  
      if (userExists) {
        return next({
          messageName: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      if (username.length < 5 || username.length > 25) {
        return next({
          messageName: 'UsernameLengthError',
          message: 'Username must be 8-25 characters'
        });
      }

      if (password.length < 8 || password.length > 25) {
        return next({
          messageName: 'PasswordLengthError',
          message: 'Password must be 8-25 characters'
        });
      }


      bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword){
        if (err){
          throw err;
        }
        else {
            
          createUser({
            username,
            password:hashedPassword,
            name,
          }).then((newUser) => {

            const token = jwt.sign({ 
              username,
              name,
              id: newUser.id
            }, process.env.JWT_SECRET, {
              expiresIn: '1w'
            });
              
            res.send({ 
              messageName: 'SignupSuccessful',
              message: "Thank you for signing up!",
              token,
              username,
              name,
              id: newUser.id
            });
          })
        }
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
    return next({
      messageName: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  const userExist = await getUserByUsername(username);

      if (!userExist) {
        return next({
          messageName: 'UserExistsError',
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

      res.send({ messageName: "LoginSuccess", message: "You're logged in!", token, name, id });

      } else {
          return next({ 
          messageName: 'IncorrectCredentialsError', 
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

    const { token } = req.body;
    const verification = jwt.verify(token, process.env.JWT_SECRET);

    const userObj ={
      id: verification.id,
      username: verification.username,
      name: verification.name
    }
    
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
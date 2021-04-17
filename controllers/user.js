
  const express = require('express')
  const userModel = require('../models/user.js');
  const bcrypt = require("bcryptjs");
  const router = express.Router();
  const bodyParser = require('body-parser');
const form = bodyParser.urlencoded({ extended: false });
 const sendgridMail = require('@sendgrid/mail')

 router.get("/sign-in", function(req, res,) {
    res.render('user/sign-in');
  });
  router.post("/sign-in", form, function(req, res, signForm) {
  let validerr = new Object();
      
      var err = { erroremail: false, errorpassword: false, msgemail: "Please enter a valid email", msgpassword: "Please enter a valid password" };
      const { email, password} = req.body;
      if (email.length === 0) {
       validerr['email'] = err.erroremail = true;
       
      }
      if (password.length === 0) {
       validerr['password'] = err.errorpassword = true;
       
      }
      return Object.keys(validerr).length
        ? res.render('user/sign-in', {
          validerr, err,
        user: req.body})
          :signForm();
      
         },(req, res)=> {
          let errors = [];
  
          // Search MongoDB for a document with the matching email address.
          userModel.findOne({
              email: req.body.email
          })
          .then((user) => {
              if (user) {
                  // User was found, compare the password in the database
                  // with the password submitted by the user.
                  bcrypt.compare(req.body.password, user.password)
                  .then((isMatched) => {
                      if (isMatched) {
                          // Password is matched.
      
                          // Create a new session and set the user to the
                          // "user" object returned from the DB.
                          req.session.user = user.toJSON({virtuals: true});
                          req.session.role = req.body.role;

                          if (req.body.role == 'clerk')
                            res.redirect('/dashboard/clerk');
                          else
                            res.redirect('/dashboard/customer');
                      }
                      else {
                          // Password does not match.
                          errors.push("Sorry, your password does not match our database.")
      
                          res.render("user/sign-in", {
                              errors
                          });
                      }
                  })
                  .catch((err) => {
                      // bcrypt failed for some reason.
                      console.log(`Error comparing passwords: ${err},`);
                      errors.push("Oops, something went wrong.");
              
                      res.render("user/sign-in", {
                          errors
                      });
                  });
              }
              else {
                  // User was not found in the database.
                  errors.push("Sorry, your email was not found.")
      
                  res.render("user/sign-in", {
                      errors
                  });
              }
          })
          .catch((err) => {
              // Couldn't query the database.
              console.log(`Error finding the user from the database: ${err},`);
              errors.push("Oops, something went wrong.");
      
              res.render("user/sign-in", {
                  errors
              });
          });
      });
      
      // Set up logout page
      router.get("/logout", (req, res) => {
          // Clear the session from memory.
          req.session.destroy();
          
          res.redirect("/user/sign-in");
      });
         

 router.get("/registration", function (req, res) {
   res.render('user/registration');
 });
 router.post("/registration", form, function (req, res, regForm) {
   
   let validerr = new Object();
let  passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,12}$/;
//password regex from: https://www.w3resource.com/javascript/form/password-validation.php
   var err = {
     errorFirstName: false, errorLastName: false, errorEmail: false,
     errorPassword: false, 
     msgErrorFirstname: "Please enter your first name",  msgErrorLastname: "Please enter your last name", 
     msgErrorEmail: "Please enter a valid email",
     msgErrorPassword: "Please enter a valid password"
   };
   const { firstName, lastName,  email, password} = req.body;
 
   if (!firstName) {
    validerr['firstName'] = err.errorFirstName = true;
   }
   if (!lastName) {
    validerr['lastName'] = err.errorLastName = true;
   }
 
   if (!email) {
    validerr['email'] = err.errorEmail = true;
   } 
   if (email) {
     emailRegEx = /\S+@\S+\.\S+/;
     if (!email.match(emailRegEx)) {
         
      validerr['email'] = err.errorEmail = true;
   }
 }
 
   if (!password) {
    validerr['password'] = err.errorPassword = true;
   }
    
    else if (!password.match(passRegEx)) {
      validerr['password'] = err.errorPassword = true;
   }
  
 
   
  return Object.keys(validerr).length
  ? res.render('user/registration', {
    validerr, err, 
    user: req.body
  })
  : regForm();

}, (req, res) => {
      sendgridMail.setApiKey(process.env.SENDGRID_API); 
      sendgridMail.send({ 
        to: req.body.email, 
        from: "aravinjan1@myseneca.ca",
        subject: 'Welcome to BEASTFOODS',
        text: 'You\'re on your way! Let\'s confirm your email address.',
        html: '<h2>Hello ' + req.body.firstName + '</h2>'
          + '<p>Welcome to <i>BEASTFOODS</i>. </p>' + 
          '<p>We are so excited to have you join us! Hope to see you soon!.</p>'
         + '<p> Thank you, <br> <i>Acksaren Ravinjan</i>. </p>'
      
      })
     
         res.redirect('/user/welcome');
         //save
         const user = new userModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
         
      });

      
      user.save()
      .then((userSaved) => {
          console.log(`User ${userSaved.firstName} has been saved to the database.`);
      })
      .catch((err) => {
          console.log(`Error adding user to the database.  ${err}`);
          res.redirect("/");
      });
       
    });
    // welcome page after user login or registration
router.get("/welcome", (req, res) => res.render("user/welcome"));
 module.exports = router;
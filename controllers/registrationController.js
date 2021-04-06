
  const express = require('express')
  const router = express.Router();
  const bodyParser = require('body-parser');
const form = bodyParser.urlencoded({ extended: false });
 const sendgridMail = require('@sendgrid/mail')

 router.get("/registration", function (req, res) {
   res.render('general/registration');
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
  ? res.render('general/registration', {
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
     
         res.redirect('/welcome');
       
    });
 module.exports = router;
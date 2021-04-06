const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const form = bodyParser.urlencoded({ extended: false });
router.get("/sign-in", function(req, res,) {
  res.render('general/sign-in');
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
      ? res.render('general/sign-in', {
        validerr, err,
      user: req.body})
        :signForm();
    
       },(req, res)=> res.redirect('/'));
module.exports = router;
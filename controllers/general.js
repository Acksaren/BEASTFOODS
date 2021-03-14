const express = require('express')
const router = express.Router();
const {getAllMeals,getTopMeal,vegetarianMeals,meatMeals,} = require("../models/mealList.js"); 

// setup a 'route' to listen on the default url path (http://localhost)
router.get("/", function (req, res) {
    res.render("general/home", { 
      meals: getAllMeals() 
    });
 });

router.get("/onTheMenu", function (req, res) {
  res.render("general/onTheMenu", {vegetarianMeals: vegetarianMeals(),meatMeals: meatMeals(),
  }); 
});


router.get("/welcome", (req, res) => res.render("general/welcome"));

module.exports = router;
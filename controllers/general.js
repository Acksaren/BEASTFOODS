<<<<<<< HEAD
const express = require('express')
const router = express.Router();
const {topMeals, getTopMeal, vegetarianMeals, meatMeals, onMenu} = require("../models/mealList.js"); 

// setup a 'route' to listen on the default url path (http://localhost)
router.get("/", function (req, res) {
  topMeals().then(meals => {
    res.render("general/home", {meals});
  });
});

router.get("/onTheMenu", function (req, res) {
  onMenu().then(meals => {
    res.render("general/onTheMenu", {meals});
  });
});


router.get("/welcome", (req, res) => res.render("general/welcome"));

=======
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

>>>>>>> 5d55491a8997ad6db6b118013ce14506f1a2957d
module.exports = router;
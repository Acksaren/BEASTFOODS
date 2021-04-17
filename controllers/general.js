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

module.exports = router;
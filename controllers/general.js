const express = require('express')
const router = express.Router();
const {topMeals, onMenu} = require("../models/mealList.js"); 
const meal = require('../models/meal');

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

router.get("/mealKit/:id", function (req, res) {
  meal.findById(req.params.id).then(meal => {
    isCustomer = req.session.role == 'customer';
    mealOrdered = meal._id in req.session.cart.items;
    res.render("general/mealKit", {meal: meal.toJSON(), isCustomer, mealOrdered});
  });
});

router.get("/welcome", (req, res) => res.render("general/welcome"));

module.exports = router;
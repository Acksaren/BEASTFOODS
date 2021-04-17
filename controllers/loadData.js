const { Router } = require("express");
const meal = require("../models/meal");
const { getAllMeals } = require("../models/mealList");
const router = Router();

router.use(function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/user/sign-in');
});

router.get('/', async function (req, res) {
    if (req.session.role != 'clerk') {
        res.render('user/loadMeals', {
            message: 'You are not authorized to add meal kits'
        });
    }
    else if (await meal.countDocuments() > 0) {
        res.render('user/loadMeals', {
            message: 'Meal kits have already been added to the database'
        });
    }
    else {
        await meal.create(getAllMeals());
        res.render('user/loadMeals', {
            message: 'Added meal kits to the database'
        });
    }
});

module.exports = router;
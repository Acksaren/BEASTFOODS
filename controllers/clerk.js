const { Router } = require("express");
const router = Router();
const meal = require("../models/meal");
const path = require('path');

router.use(function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/user/sign-in');
});

router.use(function (req, res, next) {
    if (req.session.role == 'clerk')
        next();
    else
        res.redirect('/');
});

router.get('/', function (req, res) {
	res.render('user/dashboard/clerk');
});

router.get('/meals', function (req, res) {
    meal.find().then(meals => {
        meals = meals.map(meal => meal.toJSON());
        res.render('user/dashboard/meals', {meals});
    });
});

router.get('/add-meal', function (req, res) {
    res.render('user/dashboard/addMeal');
});

router.post('/save-meal', async function (req, res) {
    let file = req.files.image;
    let imageURL = '/images/' + file.name;
    await file.mv(path.resolve('./public') + imageURL);
    meal.create({...req.body, imageURL}).then(() => {
        res.redirect('/dashboard/clerk/meals')
    });
});

router.get('/edit-meal/:id', function (req, res) {
    meal.findById(req.params.id).then(meal => {
        res.render('user/dashboard/editMeal', {meal: meal.toJSON()});
    });
});

router.post('/update-meal/:id', async function (req, res) {
    let imageURL;
    if (req.files) {
        let file = req.files.image;
        imageURL = '/images/' + file.name;
        await file.mv(path.resolve('./public') + imageURL);
    }
    else {
        imageURL = (await meal.findById(req.params.id)).imageURL;
    }
    meal.updateOne({_id: req.params.id}, {...req.body, imageURL}).then(() => {
        res.redirect('back');
    });
});

module.exports = router;
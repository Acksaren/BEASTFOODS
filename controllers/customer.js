const { Router } = require("express");
const router = Router();

router.use(function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/user/sign-in');
});

router.use(function (req, res, next) {
    if (req.session.role == 'customer')
        next();
    else
        res.redirect('/');
});

router.get('/', function (req, res) {
	res.render('user/dashboard/customer');
});

module.exports = router;
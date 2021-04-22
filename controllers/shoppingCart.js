const { Router } = require("express");
const mealKit = require("../models/meal");
const sendgridMail = require('@sendgrid/mail');

const total = mealKits => {
    let amount = 0;
    for (const meal of Object.values(mealKits)) {
        amount = amount + (meal.Quantity * meal.Price);
    }
    return amount.toFixed(2);
}

const listMeal = (req, res) => res.render('user/dashboard/shoppingCart');

const addMeal = (req, res) => {
    mealKit.findById(req.params.id).then(meal => {
        req.session.cart.items[req.params.id] = {
            id: meal._id,
            Quantity: parseInt(req.body.quantity),
            Price: meal.Price.toString(),
            imageURL: meal.imageURL,
            whatIsIncluded: meal.whatIsIncluded,
            Title: meal.Title
        };
        req.session.cart.total = total(req.session.cart.items);
        res.redirect('back');
    });
}

const updateMeal = function (req, res) {
    req.session.cart.items[req.params.id].Quantity = req.body.quantity;
    req.session.cart.total = total(req.session.cart.items);
    res.redirect('back');
}

const removeMeal = function (req, res) {
    delete req.session.cart.items[req.params.id];
    req.session.cart.total = total(req.session.cart.items);
    res.redirect('back');
}

const checkout = function (req, res) {
    sendgridMail.setApiKey(process.env.SENDGRID_API);
	sendgridMail.send({
		to: req.session.user.email,
		from: 'aravinjan1@myseneca.ca',
		subject: 'BEASTFOODS Order',
		html: `
			<p>Hello ${req.session.user.firstName}, your order has been received. Below is a summary of the meal kits you have ordered together with their quantity, price and total amount.</p>
			<table cellspacing="20">
                <thead>
                    <tr>
                        <th colspan="2" style="text-align: left;">Meal Description</th>
                        <th style="text-align: left;">Price</th>
                        <th style="text-align: left;">Quantity</th>
                        <th style="text-align: left;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.values(req.session.cart.items).map((meal, index) => `
                        <tr>
                            <td>${index + 1}.</td>
                            <td>${meal.Title}</td>
                            <td>$${meal.Price}</td>
                            <td>x${meal.Quantity}</td>
                            <td>$${parseFloat(meal.Quantity * meal.Price).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <h3>Order Total: $${req.session.cart.total}</h3>
			<p>Thank you, <br> <i>Acksaren Ravinjan</i>.</p>
		`
	});
    req.session.cart.items = {};
    req.session.cart.total = 0;
    res.redirect('back');
}

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

router.get('/', listMeal);
router.post('/checkout', checkout);
router.post('/:id/add-meal', addMeal);
router.post('/:id/update-meal', updateMeal);
router.post('/:id/remove-meal', removeMeal);

module.exports = router;
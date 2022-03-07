let {Router} = require('express');
let router = Router();
let mailer = require('../core/utils/nodemailer');
let code = require('../core/utils/validation.js');


router.post('/', (req, res) => {
    console.log(req.body);
    if(!req.body) return res.sendStatus(400);
    res.render('signed');
    let message = {
        from: 'Coffe Shop <coffeeShop@coffee>',
        to: `${req.body.email}`,
        subject: 'Email Verificaton',
        text: `your email verification code is ${code} Please, enter this code to verificate your email.
        Thank you for your registration and have a good day!
        Your Coffee Shop.`
    };
    mailer(message);
})

module.exports = {'router': router, 'code': code};
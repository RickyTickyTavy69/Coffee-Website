let {Router} = require('express');
let router = Router();

router.get('/', (req, res) => {
    res.render('signUp', {
        title: 'Register Yourself',
        isSignUp: true
    });
})


module.exports = router;
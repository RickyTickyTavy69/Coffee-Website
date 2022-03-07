let {Router} = require('express');
let router = Router();
let fs = require('fs');
let path = require('path');

router.get('/', async (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'data', 'card.json'), (error, data) => {
        if (error) {
            console.error(error);
        }
        let cardItems = JSON.parse(Buffer.from(data).toString())
        let totalPrice = cardItems.splice(0, 1);
        totalPrice = totalPrice[0].totalprice;
        res.render('card', { totalPrice: totalPrice, itemsObj: cardItems });
    });
    
})

module.exports = router;
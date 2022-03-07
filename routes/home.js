const {Router} = require('express');
const router = Router();
let path = require('path');
let fs = require('fs');


router.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, '..', 'data', 'card.json'),          
    (error, data) => {
        if (error) {
            console.error(error);
        }
        let card = JSON.parse(Buffer.from(data).toString());
        let totalPrice = card.splice(0, 1);
        totalPrice = totalPrice[0].totalprice;
        res.render('index', {
            title: 'Best Coffee In Town',
            isHome: true,
            itemsObj: card,
            totalPrice: totalPrice
        });
    })
    
})





module.exports = router;
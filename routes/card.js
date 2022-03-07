let {Router} = require('express');

let router = Router();
let Order = require('../models/order');
let path = require('path');
let fs = require('fs');
let Card = require('../models/Card');

router.get('/delete/:id',  (req, res) => {                                        // если этот роутер с "/delete" поместить после "/:id", то он выполняет
    Card.removeOne(req.params.id);                                                   // тот, что идёт первый, хоть тут и написанно /delete
    res.redirect('/');
})

router.delete('/delete/:id', async (req, res) => {
    let cardObj = await Card.removeOne(req.params.id);
    res.json(cardObj);
})

router.get('/save/:id', async (req, res) => {

    let id = req.params.id;

    return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'data', 'menu.json'),          
    (error, data) => {
        if (error) reject(error);
        let menu = Buffer.from(data).toString();                          // по идее это надо переписать
        resolve(menu);
    }) })
    .then( (menu) => {
        let menuObj = JSON.parse(menu) 
        offer = menuObj.find( (item) => {
            return String(item.id) === String(id); 
        })
        return offer;
    }).then((offer) => {
        let order = new Order(offer.type, offer.price, offer.id, offer.image);
        order.save();
                                        // по идее здесь можно было добавить сообщение в DOM типа "товар добавлен в корзину" и выделить кнопку "Your Card".
        res.redirect('/');              // чтобы было видно, что в ней что то есть. Это наверное делается через React.
    })
    .catch((error) => {
        console.error('we got problems, sir: ', error);
    })
})

module.exports = router;
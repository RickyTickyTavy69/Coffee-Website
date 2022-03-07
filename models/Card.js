let Order = require('./order');
let path = require('path');
let fs = require('fs');
//const res = require('express/lib/response');


class Card{
                                                            //constructor функция не обязательна

    static async removeOne(id){

        let cardObj =  await Order.getAll();

        let deleteIndex = cardObj.findIndex( (el) => {
           return el.id == id;
        });

        let totalPrice = cardObj[0].totalprice;
        let result = (Number(totalPrice) - Number(cardObj[deleteIndex].price)).toFixed(2)
        cardObj[0].totalprice = result;

        if (cardObj[deleteIndex].amount === 1) {
            cardObj.splice(deleteIndex, 1);
        }else{
            cardObj[deleteIndex].amount -= 1;
        }   

        return new Promise(( resolve, reject ) => {
            fs.writeFile( path.join(__dirname, '..', 'data', 'card.json'), JSON.stringify(cardObj), (error) => {

                if (error) {
                    reject(error);
                }else{
                    resolve(cardObj);
                }
    
            })
        })
    }
}


module.exports = Card;
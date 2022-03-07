let fs = require('fs');
let path = require('path');


class Order {
    
    constructor(type, price, id, image) {
        this.type = type;
        this.price = price;
        this.id = id;
        this.image = image;
        this.amount = 1;
    }

    async save() {
        let cardData = await Order.getAll();

        let sameOrderId = cardData.findIndex( (item) => {
            return item.id === this.id;
        })

        if (sameOrderId !== -1){
            cardData[sameOrderId].amount += 1;
        }
        else{
            cardData.push(this);
        }

        let totalPrice = Number(cardData[0].totalprice);
        let orderPrice = Number(this.price);
        let sum =  (totalPrice + orderPrice).toFixed(2);
        cardData[0].totalprice = sum;
        
    
        return new Promise( (resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'),
            JSON.stringify(cardData),
            (error) => {
                if (error) {
                    reject(error);
                }
                else{
                    resolve();
                }
            }
            )
        })
    }

    static getAll(){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'card.json'),          
            (error, data) => {
                if (error) {
                    reject(error)
                }
                else{
                    let cardData = Buffer.from(data).toString();
                    let cardDataObj = JSON.parse(cardData);
                    resolve(cardDataObj);
                }
            }) 
        })   
    }

    static showAddedMessage(){
        return new Promise( (resolve, reject) => {          //здесь должно выводиться сообщение о добавлении товара в корзину в DOM дерево, при нажатии
                                                            // на Add to Card
        })
    }

}


module.exports = Order;
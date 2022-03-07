const {Schema, model, Types} = require('mongoose');                    // чтобы создать модель для пользователя, нужно использовать эти две переменные Mongoose

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schema);                                 // и экспортировать через функцию model;
                                                                        // т.е, как я понял, с помощью класса Schema создаётся объект, в котором задаются
                                                                        // параметры для объекта пользователя, как в классе, а потом с помощью функции model()
                                                                        // из этого объекта снова делается класс. Зачем? Пока не знаю.
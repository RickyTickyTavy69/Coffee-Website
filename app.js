let express = require('express');
let exphbs = require('express-handlebars');
const config = require('config');           // модуль позволяет сохранять разные нужные переменные в папке config в json файле.
let mongoose = require('mongoose');
let path = require('path');

//============================================================//

let homeRoutes = require('./routes/home');
let signUpRoutes = require('./routes/signUp');
let signedRoutes = require('./routes/signed').router;
let codeRoutes = require('./routes/code');

//============================================================//

let cardRoutes = require('./routes/card');
let showCardRoutes = require('./routes/showCard');

//=============================================//

let app = express();

const PORT = config.get('port');

let port = process.env.PORT || PORT || 3000;

//===================================================// подключение к базе данных

async function start() {
  try{
    let mongoURL = 'mongodb://Artem:hailtotheking666@cluster0-shard-00-00.cqwfy.mongodb.net:27017,cluster0-shard-00-01.cqwfy.mongodb.net:27017,cluster0-shard-00-02.cqwfy.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ojmnnw-shard-0&authSource=admin&retryWrites=true&w=majority';
    await mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
    app.listen(port, () => console.log(`the server is working on port ${port}`));                     // сервер запускается только после подключения к бд.
  } catch (e) {                                                                                 ////не уверен, нужент ли здесь await Но владилен так показал
      console.log('Server Error', e.message);
      process.exit(1);                                              // не знаю точно, что это
  }
}

start();





const hbs = exphbs.create({
    deafultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
                                                                        
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));


app.use('/', homeRoutes);

app.use('/signUp', signUpRoutes);

app.use('/signed', signedRoutes);

app.use('/code', codeRoutes);

app.use('/myCard', cardRoutes);



app.use('/showCard', showCardRoutes);



//=============================================//



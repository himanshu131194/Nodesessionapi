const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const app = express();
const db = mongoose.connect( 'mongodb://olx:olx123@ds159812.mlab.com:59812/olx', { useNewUrlParser: true })
                   .then(conn => conn).catch(console.error);

app.use(bodyParser.json());
//MIDDLEWARE TO CHECK DB IS CONNECTED OR NOT
app.use((req, res, next)=>{
    Promise.resolve(db)
           .then((connetion, err)=>{
                (typeof connetion !== 'undefined')
                ? next()
                : next(new  Error('Mongo Error'))
           });
});

//STORE SESSION IN MONGODB
app.use(session({
         secret: 'mysecret@123',
         resave: false,
         saveUninitialized: true,
         store: new MongoStore({
             collection: 'sessions',
             mongooseConnection: mongoose.connection,
         })
}));


require('./api/userController');


//app.use('/users', api);
app.listen('8000', (err)=> {
     console.log("Connted to db");
     if(err){
        console.log(err);
     }
});

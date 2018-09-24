const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const app = express();
const db = mongoose.connect( 'mongodb://books:books123@ds243931.mlab.com:43931/books', { useNewUrlParser: true })
                   .then(conn => conn).catch(console.error);



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//MIDDLEWARE TO CHECK DB IS CONNECTED OR NOT
app.use((req, res, next)=>{
    Promise.resolve(db)
           .then((connetion, err)=>{
                if(typeof connetion !== 'undefined'){
                   next();
                }else{
                   next(new  Error('Mongo Error'))
                }
           });
});
// {
//              "username" : "himsanshusa",
//              "password": "12345678",
//              "email": "himanssh112@gmail.com",
//              "name": "himanshu"
// }
//STORE SESSION IN MONGODB
app.use(session({
         secret: 'mysecret@123',
         resave: false,
         saveUninitialized: true,
         store: new MongoStore({
             collection: 'sessions',
             mongooseConnection: mongoose.connection,
             ttl: 1*60*60
         })
}));

require('./api/userController')(app);

//app.use('/users', api);
app.listen('4000', (err)=> {
     console.log("Connted to db port 4000");
     if(err){
        console.log(err);
     }
});

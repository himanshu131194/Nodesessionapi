const express = require('express');
const User = require('../models/user');
const api = express.Router();

const isNotLogged = (req, res, next)=>{

}

app.get('/',(req, res)=>{
  req.session.user = {
          _id : 'id',
          username: 'Himanshu'
      }
      //req.session.save();
    res.send({
       key : req.session
    })
})

api.post('/login', isNotLogged, (req, res)=>{

})

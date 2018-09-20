const {connection, Schema} = require('mongoose');

const UserSchema = new Schema({
    username : {
       type: String,
       minlength : 4,
       maxlength : 20,
       required: [true, 'username is required'],
       validate : {
           validator : function(value){
               return '/^[A-Za-z]+$/'.test(value)
           },
           message : '{VALUE} is not a valid username'
       }
    },
    password : String
})

module.exports = mongoose.model('user', UserSchema)

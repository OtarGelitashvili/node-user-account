const mongoose = require('mongoose');
const validator=require('validator');

var userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true,
        trim:true
      
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail){
                throw new Error('Email invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        trim:true,
        minlength:3,
    },
    age: {
       type:Number,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error('Age must be a positive number')
            }
        }
    }

});



mongoose.model('User', userSchema);
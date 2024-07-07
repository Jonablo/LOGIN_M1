const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb+srv://jonablo:843228@users.cgrhe0l.mongodb.net/');

//Check database connected or not
connect.then(() => {
    console.log("Database connected Successfully.");
})
.catch(() => {
    console.log("Database cannot be connected.");
});

//Created a Schema
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//collection Part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

const taskPort = process.env.Port || 2000;

//Convert data into Json format.
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//Use EJS as the view engine.
app.set('view engine', 'ejs');

//Static File
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("Login");
});

app.get("/signup",(req, res) => {
    res.render("signup");
});


//Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //Check if the user already exists in the database.
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different username.");
    }else{
        //Hash the password using bcrypt
        const saltRounds = 10; //Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;//Replace the hash password with original password.

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect(`http://localhost:${taskPort}`);
    }
    
})

//Login User
app.post("/login", async (req, res) => {
    try {
        const Check = await collection.findOne({name: req.body.username});
        if(!Check){
            res.send("User name cannot found.");
        }else{
        //Compare the hash password from the database with the plain text.
        const isPasswordMatch = await bcrypt.compare(req.body.password, Check.password);
        if(isPasswordMatch){
            res.redirect(`http://localhost:${taskPort}`);
        }else{
            req.send("wrong password");
        }}
    } catch {
        res.send("wrong Details");
    }
})

const port = process.env.Port || 1000;
app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})
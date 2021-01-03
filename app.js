/*
    1). Getting started and npm install body-parser
    2). Create Schema
    3). Create model
    4). Create object of Model
    5). Save in database
*/

const express = require("express")
const app = express()
const path = require('path')
const port = process.env.PORT || "3000";
const hostname = '127.0.0.1';


//Getting started

//EXPRESS SPECIFIC STUFF/CONFIGRITION TO USE CSS
app.use('/static', express.static('static'));
app.use(express.urlencoded())       //To get data fom the page and add mongo database.


//SET TEMPLETING
app.set('views', path.join(__dirname, '/view'));
app.set('view engine', 'ejs'); 


//DATABASE STUFFS
// 1). Getting started
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/For_Internship', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Connection Successfu with Database For_internship!!");
});


// 2). Creating a schema
const createEmp = new mongoose.Schema({
    userName: String,
    password: String,
    'main-id': String
});

// 3). Creating a model
const createEmpe = mongoose.model('employee', createEmp);   //Name of collection is employees







//END POINTS
app.get("/", (req, res) => {
    res.render('index'); //to send pug file. feel free to use pug as it can contain both html and pug files.
});
app.get("/index", (req, res) => {
    res.render('index');
});
app.post("/validate", () => {

});
app.get("/admin_loggedIn", (req, res) => {
    res.render('admin');
});
app.get("/employee_loggedIn", (req, res) => {
    res.render('employee');
});


//START THE SERVER.
app.listen(port, (req, res) => {
    // console.log(`Serves has been started on :- localhost:${port} `);
    console.log(`Serves has been started on :- http://${hostname}:${port}/`)
});
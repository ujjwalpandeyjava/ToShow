/*
    Mongodb = database
    mongod = Main process to let database used by any tech
    mongoose =  A library to let nodejs app use mongo database.
    powershell/compass = one of the tech to use mongo database.
    Different tech which can use monogo database:- powershell of pc, mongoose, python libraies, java app lib, etc.
*/
/*
    1). Getting started and npm install body-parser
    2). Create Schema
    3). Create model
    4). Create object of Model
    5). Save in database
*/
// 1). Getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database1', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("WE are connected!!")
});


// 2). Createda a schema - Helps us to define the database what to enter and what to restricts.
const kittySchema = new mongoose.Schema({
    name: String
});


// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}


// 3). Created a model - model is final compiled schema.
const Kitten = mongoose.model('Kitten', kittySchema);
//Name of collection is the pural form of name given to object in the database mentioned while connecting.


// 4). Create Obect - different objects to save in database.
//These objects will be used a documents
const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence' in console.log

const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"


// 5). Saving in database
//must use new object for every object.
silence.save(function (err, s) {
    if (err) return console.error(err);
    s.speak();
});
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});



//Find in the collection
Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
});
//Finding with a callback: can be function, value, obj,  anything.
Kitten.find({ name: /^fluff/ }, callback);




/*       CRUD OPERATION DOCUMENTATION FOR MONGOOSEDB
              Create, Read, Update and Delete
    https://docs.mongodb.com/manual/crud/#create-operations 
       They can be one or many with respective functions.
//CREATE
    Insert single 
        db.collection.insertOne( document-onlyone )
    db.inventory.insertOne(
        { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
    )
    Insert multiple 
        db.collection.insertMany([ {document-one},{document-two},...,{document-n} ])
    db.inventory.insertMany([
        { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
        { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
        { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
    ])
//READ
        db.collection.find()
    db.inventory.find( {} ) //Show all
    db.inventory.find( { status: "D" } )  //with condition
    db.inventory.find( { status: { $in: [ "A", "D" ] } } )  //where status equals either "A" or "D"
    db.inventory.find( { status: "A", qty: { $lt: 30 } } )  //AND
    db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } ) //OR
    db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
    } )     //Specify AND as well as OR Conditions
//UPDATE
        db.collection.updateOne(<filter>, <update>, <options>)
    db.inventory.updateOne(
        { item: "paper" },
        {    
            $set: { "size.uom": "cm", status: "P" },
            $currentDate: { lastModified: true }
        }
    )
        db.collection.updateMany(<filter>, <update>, <options>)
    db.inventory.updateMany(
    { "qty": { $lt: 50 } },
        {
            $set: { "size.uom": "in", status: "P" },
            $currentDate: { lastModified: true }
        }
    )
        db.collection.replaceOne(<filter>, <update>, <options>)
    db.inventory.replaceOne(
        { item: "paper" },
        { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
    )
//DELETE
        db.collection.deleteMany()
    db.inventory.deleteMany({ status : "A" })
        db.collection.deleteOne()
    db.inventory.deleteOne( { status: "D" } )
*/
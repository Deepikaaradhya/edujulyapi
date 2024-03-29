var express = require('express');
const app = express();
const port = process.env.PORT||9001;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl = "mongodb://localhost:27017"
const mongourl = "mongodb+srv://edureka:12345@cluster0.qsxfc.mongodb.net/eduaug?retryWrites=true&w=majority"

var db;

//get
app.get('/',(req,res) => {
    res.send("Welcome to Node Api1")
})

//list of cities
app.get('/location',(req,res) =>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//list of restaurents
app.get('/restaurents',(req,res) =>{
    db.collection('restaurents').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//list of restaurents wrt city
//params example
/*app.get('/restaurents/:cityId',(req,res) =>{
    var cityId = req.params.cityId;
    console.log("cityId>>>>",cityId)
    db.collection('restaurents').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})*/

//query example
app.get('/restaurents',(req,res) =>{
    var cityId = req.query.cityId?req.query.cityId:"2";
    db.collection('restaurents').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//list of QuickSearch
app.get('/quicksearch',(req,res) =>{
    db.collection('mealtype').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('eduaug');
    app.listen(port,()=>{
        console.log(`listening on port no ${port}`)
    });
})

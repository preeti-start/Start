/**
 * Created with IntelliJ IDEA.
 * User: Sushil
 * Date: 5/2/14
 * Time: 1:23 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var moment = require('moment');
//console.log("moment is----->"+moment)



var methods= require("./Functions.js");

/*
 * TypeError: object Bonjour has no
 * method 'sayHelloInEnglish'
 */
methods.sayHelloInEnglish();

/*
 * TypeError: object Bonjour has no
 * method 'sayHelloInSpanish'
 */
methods.sayHelloInSpanish();













// configuration ===========================================

// config files


app.use(express.static(__dirname + './../Public')); 	// set the static files location /public/img will be /img for users
// log every request to the console
app.use(express.bodyParser()); 						// have the ability to pull information from html in POST
app.use(express.methodOverride()); 					// have the ability to simulate DELETE and PUT


//app.get('/', function (req, res) {
// res.sendfile('./public/index.html');

//})


app.get('/response', function (req, res) {
    console.log("hello to response file");
    /* res.format({

     'application/json': function(){
     res.send(result2);
     }
     }); */

    res.sendfile('./public/html/response.html');


})

app.get('/insert', function (req, res) {
    console.log("hello to insert file");
    var name = req.param('name');
    var id = req.param('id');
    console.log("name " + name + " id " + id);
    methods.insert(name, id);

    res.send("record successfully inserted")
});

app.get('/delete', function (req, res) {
    console.log("hello to delete file");
    var name = req.param('name');

    console.log("name " + name);
    methods.deletedata(name);

    res.send("record successfully deleted")
});


app.get('/update', function (req, res) {
    console.log("hello to update file");
    var name = req.param('name');
    var id = req.param('id');


    console.log("name " + name);
    methods.update(name, id);

    res.send("record successfully updated ")


});


app.get('/get', function (req, res) {

    var callback = function (err, result) {
        console.log("result >> " + JSON.stringify(result));
        res.format({

            'application/json':function () {
                res.send(result);

            }
        });
    }

    methods.find(callback);

});


app.get('/', function (req, res) {


    res.sendfile('./../Public/index.html');



});




app.listen(5000);
console.log("server is runnign at 5000");
/**
 * Created with IntelliJ IDEA.
 * User: sushil
 * Date: 11/12/14
 * Time: 3:59 PM
 * To change this template use File | Settings | File Templates.
 */

// var exports = module.exports = {};

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var db;


MongoClient.connect('mongodb://127.0.0.1:27020/torerocorp_sb', function (err, db1)
{
    if (err) throw err;
    db = db1;



//    var count = 0;
//    db.orders.find().forEach( function(d) { for(f in d) { count++; }
//    console.log("total>>>>>"+count)});

    return db;
});


exports.sayHelloInEnglish = function() {
    console.log("sayHelloInEnglish called>>>>>>")
    return "HELLO";
};

exports.sayHelloInSpanish = function() {
    console.log("sayHelloInSpanish called>>>>>>")
    return "Hola";
};


exports.insert=function (name, id) {
    var collection = db.collection('record');
    collection.insert({name:name, id:id}, function (err, docs) {
        console.log("Error is:" + err);

    })
}

exports.deletedata=function (name) {
    var collection = db.collection('record');
    collection.remove({name:name}, function (err, docs) {
        console.log("Error is:" + err);

    })

}


exports.update=function (name, id) {
    var collection = db.collection('record');
    collection.update({name:name}, {"$set":{id:id}}, function (err, docs) {
        console.log("Error is:" + err);

    })
}




exports.find=function(callback) {
    var collection = db.collection('employees');

    var count = 0;

    collection.find().toArray( function(err,d) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }

        for(f in d) { count++; }
        console.log("total>>>>>"+count)});
    collection.find().toArray(function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }

        console.log("returning"+result)
        callback(null, JSON.stringify(result));
    });


}

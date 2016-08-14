var mongodb = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;
var url = 'mongodb://127.0.0.1/chat';

mongodb.connect(url, function(err, db) {
    if (err) throw err;

    client.on('connection', function(socket) {

        var collection = db.collection('messages');
        //Wait for input from index.html
        socket.on('input', function(data) {
            //console.log(data);
            var name = data.name;
            var message = data.message;
            //Insert in database
            collection.insertOne({
                name: name,
                message: message
            }, function(err) {
                if (err) throw err;

                console.log('Inserted');
            });
        });
    });
});

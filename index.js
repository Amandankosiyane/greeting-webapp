// var express = require('express');
// var app = express();
//
// var people = [];
// app.get('/greetings/:name', function(req, res) {
//   var name = req.params.name;
//   people.push(name);
//   res.send('Hello,' + name)
// });
//
// app.get('/greeted', function(req, res) {
//   res.send(people);
// })
//
// app.get('/counter/:name', function(req, res) {
//   var name = req.params.name;
//
//   function counts(input) {
//     return input == name;
//   }
//   var nameCounter = people.filter(counts).length;
//
//   res.send("Hello," + name + " " + "has been greeted " + " " +  nameCounter + " time(s).")
//
// })
//
// var server = app.listen(3000, function() {
//
//   var host = server.address().address;
//   var port = server.address().port;
//
//   console.log('Example app listening at http://%s:%s', host, port);
//
// });

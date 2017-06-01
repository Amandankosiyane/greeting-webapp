const express = require('express');
const app = express();

app.get('/greeting', function(){
        res.send('Hello amanda!')
})
const port = 3007;
app.listen(port, function(){
        console.log('web app started on port : ' + port);
});




















// var express = require('express');
// var expressHandlebars = require('express-handlebars');
// var bodyParser = require('body-parser');
// var expressFlash = require('express-flash');
// var expressSession = require('express-session');
//
// var subjectRoutes = require('./subjects');
// var Models = require('./models');
// var app = express();

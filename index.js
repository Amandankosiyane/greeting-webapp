var path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const NamesRoutes = require('./greets');
const  namesRoutes = NamesRoutes();
const app = express();

app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req,res){
        res.redirect('/greets')
})
app.get('/greets/greeted', namesRoutes.index);
app.get('/greets', namesRoutes.greeted);
// app.get('/greets/count', namesRoutes.count)
app.post('/greets', namesRoutes.greeted);

const port = 3007;
app.listen(port, function(){
        console.log('web app started on port : ' + port);
});

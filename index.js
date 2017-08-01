var path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const SubjectRoutes = require('./subjects');
const  subjectRoutes = SubjectRoutes();
const app = express();

app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/subjects/add', subjectRoutes.index);
app.get('/subjects', subjectRoutes.add);
// app.get('/subjects/count', subjectRoutes.count)
app.post('/subjects', subjectRoutes.add);

const port = 3007;
app.listen(port, function(){
        console.log('web app started on port : ' + port);
});

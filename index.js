const express = require('express');
// const SubjectRoutes = require('./subjects');
// const  subjectRoutes = SubjectRoutes();
const app = express();

app.get('/', function(req,res){
        res.send('Hellow world');
})
// app.get('/subjects', subjectRoutes.index);
// app.get('/subjects/:add', subjectRoutes.add);
const port = 3007;
app.listen(port, function(){
        console.log('web app started on port : ' + port);
});

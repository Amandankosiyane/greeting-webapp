module.exports = function() {
        const subjectList = [];

        const index = function(req, res) {
                res.render('subjects/index', {subjects : subjectList});
        }
        const addScreen = function(req,res){
                res.render('subjects/add');
        }

        const add = function(req, res) {
                var subject = req.params.subject;
                var foundSubject = subjectList.find(function(currentSubject) {
                        return currentSubject === subject

                });

                if (subject && !foundSubject) {
                        subjectList.push(subject);
                }

                res.send('Hello, ' + subject + '!');
                // res.redirect('/subjects');
        }

        return {
                index,
                add,
                addScreen
        }
}

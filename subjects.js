module.exports = function() {
        const greetedNames = [];

        const index = function(req, res) {
                res.render('add', {subjects: greetedNames});
        }

        const add = function(req, res) {
                var name = req.body.name;

                var foundSubject = greetedNames.find(function(currentSubject) {
                        return currentSubject === name

                });

                if (name && !foundSubject) {
                        greetedNames.push(name);

                } else {
                        req.flash('error', 'name already greeted!');
                }

                var output = 'Hello, ' + name + '!';
                res.render('index', {name: output});
        }

        return {
                index,
                add
        }
}

module.exports = function(models) {
        const greetedNames = [];

        const index = function(req, res) {
                res.render('greeted', {greets: greetedNames});
        }

        const greeted = function(req, res) {
                var name = req.body.name;
                var language = req.body.language;
                var languageGreeted = "";

                var foundName = greetedNames.find(function(currentName) {
                        return currentName === name

                });

                if (name && !foundName ) {
                        greetedNames.push(name);
                }
                // else {
                //         req.flash('error', 'name already greets!');
                // }

                // var output = 'Hello, ' + name + '!';

                if (language === "IsiXhosa"){
                        languageGreeted = "Molo, " + name + "!"
                }
                else if (language === "English") {
                        languageGreeted = "Hello, " + name + "!"
                }
                else if (language === "Afrikaans") {
                        languageGreeted = "Halo, " + name + "!"
                }
                res.render('index', {name: languageGreeted});
        }

        return {
                index,
                greeted
        }
}

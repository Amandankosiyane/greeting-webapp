module.exports = function(models) {
        const greetedNames = [];

        const index = function(req, res, next) {
                models.Greets.find({}, function(err, greets){
                        if(err){
                                return next(err);
                        }
                        res.render('greeted', {greets});
                });
        }

        const greeted = function(req, res,next) {
                var language = req.body.language;
                var languageGreeted = "";
                var name = {
                         nym: req.body.name
                };

                if(!name || !name.nym){
                        req.flash('error', 'Name should not be blank');
                }else{
                        models.Greets.create(name, function(err, results){
                                if(err){
                                        if(err.code === 11000){
                                                req.flash('error', 'Name already exist');
                                        }else{
                                                return next(err);
                                        }
                                }
                        })
                }


                if (language === "IsiXhosa"){
                        languageGreeted = "Molo, " + name.nym + "!"
                }
                else if (language === "English") {
                        languageGreeted = "Hello, " + name.nym+ "!"
                }
                else if (language === "Afrikaans") {
                        languageGreeted = "Halo, " + name.nym + "!"
                }
                res.render('index', {name: languageGreeted});
        }

        return {
                index,
                greeted
        }
}

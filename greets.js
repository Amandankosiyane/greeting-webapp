module.exports = function(models) {
        const greetedNames = [];

        const index = function(req, res, next) {
                models.Greets.find({}, function(err, greets) {
                        if (err) {
                                return next(err);
                        }
                        res.render('greeted', {
                                greets
                        });
                });
        }
        const showGreets = function(req, res) {
                res.render('index');
        }

        const greeted = function(req, res, next) {
                var language = req.body.language;
                var languageGreeted = "";
                var name = {
                        nym: req.body.name
                };

                if (!name || !name.nym) {
                        req.flash('error', 'Name should not be blank!!!');
                } else {

                        if (language === undefined) {
                                req.flash('error', 'Please select a language!!!');
                        } else {
                                models.Greets.findOne({
                                        nym: req.body.name
                                }, function(err, name) {
                                        if (err)
                                                if (err.code === 11000) {
                                                        req.flash('error', 'Name already exist!!!');
                                                }




                                        if (name) {

                                                console.log('name:', name);

                                                name.countGreetings = name.countGreetings + 1;
                                                if (language === "IsiXhosa") {
                                                        languageGreeted = "Molo, " + name.nym + "!"
                                                } else if (language === "English") {
                                                        languageGreeted = "Hello, " + name.nym + "!"
                                                } else if (language === "Afrikaans") {
                                                        languageGreeted = "Halo, " + name.nym + "!"
                                                }

                                                name.save(function (err, results) {
                                                        if (err) {
                                                                return next(err)
                                                        }
                                                })


                                                res.render('index', {
                                                        name: languageGreeted
                                                });

                                        }

                                        if (name === null) {
                                                models.Greets.create({
                                                        nym: req.body.name,
                                                        countGreetings: 1
                                                }, function(err, results) {
                                                        if (err)
                                                                if (err.code === 11000) {
                                                                        req.flash('error', 'Name already exist!!!');
                                                                }

                                                        models.Greets.findOne({
                                                                nym: req.body.name
                                                        }, function(err, name) {
                                                                if (err) {
                                                                        if (err.code === 11000) {
                                                                                req.flash('error', 'Name already exist!!!');
                                                                        }
                                                                }
                                                                if (language === "IsiXhosa") {
                                                                        languageGreeted = "Molo, " + name.nym + "!"
                                                                } else if (language === "English") {
                                                                        languageGreeted = "Hello, " + name.nym + "!"
                                                                } else if (language === "Afrikaans") {
                                                                        languageGreeted = "Halo, " + name.nym + "!"
                                                                }
                                                                res.render('index', {
                                                                        name: languageGreeted
                                                                });

                                                        })

                                                })

                                        }
                                })
                        }
                }
        }



        const counter = function(req, res) {
                var user_id = req.params.user_id;

                models.Greets.findOne({
                        _id: user_id
                }, function(err, count) {
                        if (err) {
                                return next(err);
                        }
                        console.log('count', count);
                        if (count) {

                                var countGreetedNames = count.nym + " has been greeted " + count.countGreetings + " time(s)!"
                        }
                        console.log(countGreetedNames);
                        res.render('counter', {
                                count: countGreetedNames
                        });
                });
        }

        return {
                index,
                greeted,
                showGreets,
                counter
        }
}

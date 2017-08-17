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
                var msg = "";
                var languageGreeted = "";
                var firstLett = req.body.name.substring(0, 1);
                var caps = req.body.name.substring(0, 1).toUpperCase();

                var name = {
                        nym: req.body.name.replace(firstLett,caps)
                };

                if (!language) {
                        req.flash('error', 'Please select a language!!!');
                        res.render('index');
                } else {
                        models.Greets.findOne({
                                nym: req.body.name.replace(firstLett,caps)
                        }, function(err, name) {
                                if (err) {
                                        return next(err);
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

                                        name.save(function(err, results) {
                                                if (err) {
                                                        return next(err);
                                                }
                                        })

                                        models.Greets.find({}, function(err, names) {
                                                if (err) {
                                                        return next(err)
                                                }
                                                msg = 'Names greeted for this session is ' + names.length

                                                var data = {
                                                        name: languageGreeted,
                                                        msg: msg
                                                }
                                                console.log(data);
                                                res.render('index', data);
                                        })


                                }

                                if (name === null) {
                                        models.Greets.create({
                                                nym: req.body.name.replace(firstLett,caps),
                                                countGreetings: 1
                                        }, function(err, results) {
                                                if (err) {
                                                        return next(err);
                                                }

                                                models.Greets.findOne({
                                                        nym: req.body.name.replace(firstLett,caps)
                                                }, function(err, name) {
                                                        if (err) {
                                                                return next(err);
                                                        }
                                                        if (language === "IsiXhosa") {
                                                                languageGreeted = "Molo, " + name.nym + "!"
                                                        } else if (language === "English") {
                                                                languageGreeted = "Hello, " + name.nym + "!"
                                                        } else if (language === "Afrikaans") {
                                                                languageGreeted = "Halo, " + name.nym + "!"
                                                        }
                                                        models.Greets.find({}, function(err, names) {
                                                                if (err) {
                                                                        return next(err)
                                                                }
                                                                msg = 'Names greeted for this session is ' + names.length

                                                                var data = {
                                                                        name: languageGreeted,
                                                                        msg: msg
                                                                }
                                                                console.log(data);
                                                                res.render('index', data);
                                                        })

                                                })

                                        })

                                }
                        })
                }
        }



        const counter = function(req, res, next) {
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

        const clearData = function(req, res, next) {
                models.Greets.remove({}, function(err) {
                        if (err) {
                                return next(err);
                        }
                        res.render('index');
                })
        }

        return {
                index,
                greeted,
                showGreets,
                counter,
                clearData
        }
}

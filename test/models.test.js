const assert = require('assert');
const Models = require('../models')
describe('models should be able to', function(){
        var models = Models("mongodb://localhost/greetings-test");
        beforeEach(function(done){
                models.Greets.remove({}, function(err){
                        done(err);
                })
        })
        it('should store names greeted to mongoDB', function(done){
                var GreetsData = { nym: 'the test nym'}
                models.Greets.create(GreetsData, function(err){
                        // done(err);
                        models.Greets.find({nym: 'the test nym'}, function(err,greets){
                                assert.equal(1, greets.length);
                                done(err);
                        })
                });
                // assert.equal(1,2);
        });
        it('should not allow duplicate names', function(done){
                var GreetsData = { nym: 'the test nym'}
                models.Greets.create(GreetsData, function(err){
                        // done(err);
                                var GreetsData = { nym: 'the test nym'}
                                models.Greets.create(GreetsData, function(err){
                                        assert.ok(err, 'should give an error for duplicate name');
                                        done();
                                        });
                        });
        });
});









// const Models = require('../models');
// const assert = require('assert');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/greetings');
//
// const Name = mongoose.model('Name', {
//         Names: String
// });
//
// describe('models should be able to', function() {
//         it('should store names greeted to mongoDB', function(done) {
//                 var nym = new Name({
//                         nym: nym
//                 });
//                 nym.save().then(function() {
//                         assert(nym.isNew === false);
//                         done();
//                 });
//         });
// });




// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//         we are connected!
// });
// const nameSchema = mongoose.Schema( {nym: String});
// var Name = mongoose.model('Name', nameSchema);
// var greet = new Name({ name: 'Greet' });
// console.log(greet.name);

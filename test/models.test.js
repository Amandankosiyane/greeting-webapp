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
                        models.Greets.find({nym: 'the test nym'}, function(err,greets){
                                assert.equal(1, greets.length);
                                done(err);
                        })
                });
        });

        it('should not allow duplicate names', function(done){
                var GreetsData = { nym: 'the test nym'}
                models.Greets.create(GreetsData, function(err){

                                var GreetsData = { nym: 'the test nym'}
                                models.Greets.create(GreetsData, function(err){
                                        assert.ok(err, 'should give an error for duplicate name');
                                        done();
                                        });
                        });
        });

});

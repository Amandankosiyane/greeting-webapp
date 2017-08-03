// const Models = require('../models');
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greetings');

const Name = mongoose.model('Name', {
        Names: String
});

describe('models should be able to', function() {
        it('should store names greeted to mongoDB', function(done) {
                var nym = new Name({
                        nym: 'Amy'
                });
                nym.save().then(function() {
                        assert(nym.isNew === false);
                        done();
                });
        });
});

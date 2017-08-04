const mongoose = require('mongoose');
module.exports = function(mongoUrl){
        mongoose.connect(mongoUrl);
        const nameSchema = mongoose.Schema({nym: String});
        nameSchema.index({nym: 1}, {unique: true});
        const Greets = mongoose.model('Greets', nameSchema);
        return {
                Greets
        };
}

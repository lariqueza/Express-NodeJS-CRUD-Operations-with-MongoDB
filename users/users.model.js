const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fullname: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    ethnicity: { type: String, required: true },
    gender: { type: String, required: true },
    relationship: { type: String, required: true },
    employment: { type: String, required: true },
    children: { type: String, type: Number, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User, schema');
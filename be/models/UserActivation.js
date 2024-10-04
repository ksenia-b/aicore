const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userActivationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserActivation', userActivationSchema);
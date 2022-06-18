const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: ['true', 'Please add a text value']
    }
}, {
    timestamps: true    //generates the updated at and created at fields
})

module.exports = mongoose.model('Goal', goalSchema)


const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //type objectId
        required: true,
        ref: 'User' // the reference to which this objectId pertain to
    },
    text: {
        type: String,
        required: ['true', 'Please add a text value']
    }
}, {
    timestamps: true    //generates the updated at and created at fields
})

module.exports = mongoose.model('Goal', goalSchema)


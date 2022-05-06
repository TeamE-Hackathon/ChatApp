const mongoose = require('mongoose');

const MsgSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
        },
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    // ToDo
    // created_at: {
    //     type: String,
    //     // required: true
    // },
});

const Msg = mongoose.model('msg', MsgSchema);
module.exports = Msg;

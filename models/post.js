const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/miniprojec');


const postSchema = mongoose.Schema({
    // user who created the post 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    // At what date the post was created
    date: {
        type: Date,
        default: Date.now
    },

    // content of the post
    content: String,

    // likes from other users
    likes:
        [
            { type: mongoose.Schema.Types.ObjectId,
                 ref: 'User' }
        ]
});

const model = mongoose.model('Post', postSchema); // name of the model and at what scheme it is being created

module.exports = model;
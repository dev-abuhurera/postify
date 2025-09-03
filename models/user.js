const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/miniprojec');


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [
            { type: mongoose.Schema.Types.ObjectId, 
                ref: 'Post' }
        ] // reference to Post model
});

const model = mongoose.model('User', userSchema); // name of the model and at what scheme it is being created

module.exports = model;
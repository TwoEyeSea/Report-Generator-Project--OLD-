const mongoose = require('mongoose')


// Schema
const Schema = mongoose.Schema; // 
const BlogPostSchema = new Schema({
    title: String, //String is shorhand for {type: string}
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
// The mongoose.model takes a model name, "BlogPost" and passes it a Schema "BlogPostSchema"


module.exports = BlogPost



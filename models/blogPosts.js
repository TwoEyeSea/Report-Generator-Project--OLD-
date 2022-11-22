const mongoose = require('mongoose')
const Schema = mongoose.Schema; // 

// Schema for Trial Pits
const TrialPitSchema = new Schema(
    { firstName: String, lastName: String }
)
// Schema for Report
const BlogPostSchema = new Schema({
    userId: Number,
    title: String, //String is shorhand for {type: string}
    description: String,
    date: {
        type: String,
        default: Date.now()
    },
    customers: [TrialPitSchema]
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
// The mongoose.model takes a model name, "BlogPost" and passes it a Schema "BlogPostSchema"


module.exports = BlogPost

// =======================Potential Schema Format with Trial Pits
// const BlogPostSchema = new Schema({
//     userId: Number,
//     title: String, //String is shorhand for {type: string}
//     description: String,
//     trialPits: [
//         { trialPit1: String },
//         { trialPit2: String },
//         { trialPit3: String }
//     ],
//     date: {
//         type: String,
//         default: Date.now()
//     }
// });
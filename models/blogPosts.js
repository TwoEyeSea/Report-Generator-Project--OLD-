const mongoose = require('mongoose')
const Schema = mongoose.Schema; // 

// Schema for Trial Pits
const TrialPitSchema = new Schema(
    { groundWaterLevel: Number, finalDepth: Number, bearingStratum: String }
)
// Schema for Report
const BlogPostSchema = new Schema({
    userId: String, // The userId is too large to be stored with a type of "Number" MongoDB Number integer overflow occurs after 17 integers and replaces subsequent integers with "0"
    title: String, //String is shorhand for {type: string}
    description: String,
    date: {
        type: String,
        default: Date.now()
    },
    trialPits: [TrialPitSchema]
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
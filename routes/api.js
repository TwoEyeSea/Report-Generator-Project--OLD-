const express = require("express");

// Models are imported into the api.js file for use
const router = express.Router();
const BlogPost = require('../models/blogPosts')

// ROUTES
router.get('/', (req, res) => {

    BlogPost.find({}) // MongoDB syntax to query the collection for all documents

        .then((data) => {
            console.log('Data:', data) // Logging the retrieved data on the consoe.
            res.json(data); // Displaying the retrieved data in a json format within the response.
            //res.json(data) needs to be specified within the ".then((data))..." in order to display the data at the designated port of 8080
        })
        .catch((error) => {
            console.log('error:', error)
        })
});

// To reach the route for this data, you need to got ot "http://localhost:8080/api/name"
router.get('/name', (req, res) => {
    const data = {
        username: "Alex",
        age: 26
    }
    res.json(data)
});

// POSTING Data to the DB
router.post('/save', (req, res) => {
    console.log('Body:', req.body);// NOTE request or req.body is convention and needs to be specified as "req.body", we don't change this according to our schema.
    const data = req.body;

    const newBlogPost = new BlogPost(data); //Be careful not to pass the data constant within curly braces e.g. ({data}) -> this caused a bug with the post request

    //.save
    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        res.json({
            msg: 'Your data has been saved!!!'
        })
    })

});



module.exports = router;
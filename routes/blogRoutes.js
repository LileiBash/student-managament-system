const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.js')

router.get('/blogs', (req, res)=>{
    Blog.find()
        .then(result => {
            res.render('blogs', { blogs : result});
        })
    // res.render('blogs');
        .catch(error => console.log(error));
})

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    // blog.save()
    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch((error)=> console.log(error))

})

router.get('/blogs/create', (req, res)=>{
    res.render('create')
})

router.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result })
        })
        .catch(error => console.log(error))
})

router.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect : '/blogs'});

        })
        .catch(error => {console.log(error);})
})

module.exports = router;
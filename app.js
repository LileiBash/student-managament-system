const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog.js')

app.set('view engine', 'ejs');
// connect to database
const dbUrl = 'mongodb+srv://lilei:test123@cluster0.3tiki.mongodb.net/system_db?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        app.listen('8000', ()=>{
            console.log('Database is connected');
            console.log('app is listenin at port 8000');
        })
    })
    .catch((error)=>console.log(`Error connection to MongoDb ${error}`))

//set up middelware for serving static file
// app.use(express.static('/public'))
// set middleware
app.use((req, res, next)=>{
    console.log('New request made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
})
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))




//rout
app.get('/', (req, res)=>{
    // res.render('home');
    res.redirect('/blogs')    
})

// test new middleware
// app.use((req, res, next)=>{
//     console.log('In the next middleware');
//     next();
// })

app.get('/about', (req, res)=>{
    res.render('about');
})

app.get('/blogs', (req, res)=>{
    Blog.find()
        .then(result => {
            res.render('blogs', { blogs : result});
        })
    // res.render('blogs');
        .catch(error => console.log(error));
})

app.post('/blogs', (req, res) => {
    // const blog = new Blog(req.body);
    // blog.save()
    //     .then(result => {
    //         res.redirect('/blogs')
    //     })
    //     .catch((error)=> console.log(error))
    const blog = new Blog(req.body);
    console.log(blog);
})

app.get('/create/blogs', (req, res)=>{
    res.render('create')
})

<<<<<<< HEAD
=======

>>>>>>> parent of 19d64a7 (hello bro)

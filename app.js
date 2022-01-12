const express = require('express');
// const { render } = require('express/lib/response');
// const res = require('express/lib/response');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


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
app.set('view engine', 'ejs');
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
app.get('/about', (req, res)=>{
    res.render('about');
})

//blog route
app.use(blogRoutes)

//page 404
app.use((req,res)=>{
    res.send('OOPS, page not found :)');
})
const express = require('express');
const app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.send('hi bro')
    res.render('index', {title: "home"});
})
app.get('/about', (req, res)=>{
    res.render('about', {title: "about"});
})

app.listen(4000, ()=>{
    console.log('Server is listening on port: 4000...');
});


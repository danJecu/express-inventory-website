const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen to requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        {
            title: 'Yoshi finds egss',
            snippet: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            title: 'Going in vacation',
            snippet: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            title: 'Work life',
            snippet: 'Lorem ipsum dolor sit amet consectetur.',
        },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

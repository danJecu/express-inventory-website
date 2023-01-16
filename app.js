const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to MongoDB
const dbURI =
    'mongodb+srv://<username>:<password>@cluster1234.v7ojgvu.mongodb.net/cluster1234?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose routes
app.get('/add/blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog',
    });

    blog.save()
        .then(results => {
            res.send(results);
        })
        .catch(err => console.log(err));
});

// routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

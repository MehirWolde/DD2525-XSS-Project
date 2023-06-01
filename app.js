const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const hbs = handlebars.create({ defaultLayout:'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* const crypto = require('crypto'); // nodejs package for generating random nonce values
let nonce = crypto.randomBytes(16).toString('base64');

// start sidan ska vara att man har en text box och det man skriver in ska sparas i databas och visas på sidan
app.use((req, res, next) => {       // middleware using csp with nonce values for script-src
    res.set({
        'Content-Security-Policy':      // set to report only during dev
        `default-src 'self'; script-src 'nonce-${nonce}'`
    });
    next();
}); */


let listArr = [];

app.get('/', (req, res) => {
    res.render('main', {name: "Johan", age: 30, list: listArr});
});

app.post('/add', (req, res) => {
    const item = req.body.item;
    listArr.push(item);
    res.redirect('/');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
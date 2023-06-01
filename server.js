const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const connectDB = require('./db')
connectDB();

const expbs = require('express-handlebars');

app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');
app.set('views', 'views');
/* const express_waf_middleware = require("express-waf-middleware");

const crypto = require('crypto'); // nodejs package for generating random nonce values
let nonce = crypto.randomBytes(16).toString('base64');



// start sidan ska vara att man har en text box och det man skriver in ska sparas i databas och visas på sidan
app.use((req, res, next) => {       // middleware using csp with nonce values for script-src
    res.set({
        'Content-Security-Policy':      // set to report only during dev
        `default-src 'self'; script-src 'nonce-${nonce}'`
    });
    next();
});
 */

//setting up app to use handlebars as view engine

app.get('/', (req, res) => {
    res.render("main", {name: "Johan", age: 30});
});

app.get('/search', (req, res) => {
    // fixa så att det här är en separat route där man söker efter något och det man söker efter hamnar i query
    const query = req.query.q;
    res.send(`You searched for ${query}`);
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
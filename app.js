const express = require('express');
const app = express();
const express_waf_middleware = require("express-waf-middleware");

const crypto = require('crypto'); // nodejs package for generating random nonce values
let nonce = crypto.randomBytes(16).toString('base64');

app.use((req, res, next) => {       // middleware using csp with nonce values for script-src
    res.set({
        'Content-Security-Policy':      // set to report only during dev
        `default-src 'self'; script-src 'nonce-${nonce}'`
    });
    next();
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`You searched for ${query}`);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
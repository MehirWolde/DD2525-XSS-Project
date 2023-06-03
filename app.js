const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const hbs = handlebars.create({ defaultLayout: "main" });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


/*const easyWaf = require('easy-waf');
app.use(easyWaf());

const sanitizeHtml = require("sanitize-html");

const sanitizeOptions = {       //these are the options for sanitizing html, we should make it more specific
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
        "a": ["href"]
    },
    allowedIframeHostnames: ["www.youtube.com"] //allow iframes with youtube videos
}


const crypto = require('crypto'); // nodejs package for generating random nonce values
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
let listResults = [];
let querySearch = ""

app.get("/", (req, res) => {
  res.render("main", { list: listArr });
});

app.post("/add", (req, res) => {
  const item = req.body;
  /* cleanName = sanitizeHtml(item.name, sanitizeOptions);
  cleanNote = sanitizeHtml(item.note, sanitizeOptions);
  listArr.push({ name: cleanName, note: cleanNote}); */
  listArr.push(item);
  res.redirect("/");
});

app.get("/search", (req, res) => {
  if (req.query.q) {
    /* query = sanitizeHtml(req.query.q, sanitizeOptions); */
    res.render("search", { results: listResults, search: req.query.q, count: listResults.length, querySearch: querySearch });
  } else {
    res.render("search");
  }
});

app.post("/search", (req, res) => {
    const { search, searchOption } = req.body;
    /* cleanSearch = sanitizeHtml(search, sanitizeOptions);
    querySearch = cleanSearch
    cleanSearchOption = sanitizeHtml(searchoption, sanitizeOptions); */
    querySearch = search
    listResults = [];
    if (searchOption === "name") {
      listResults = listArr.filter((item) => item.name.includes(search));
    } else if (searchOption === "note") {
      listResults = listArr.filter((item) => item.note.includes(search));
    }
  
    res.redirect(`/search?q=${searchOption}`);
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

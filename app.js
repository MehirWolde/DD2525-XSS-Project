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


/*
 * The code below creates a middleware using the npm package easy-waf.
 * This middleware sets up a simple web application firewall to protect against
 * common web attacks but is mostly used in this case for XSS attacks.
 */

/*
const easyWaf = require('easy-waf');
app.use(easyWaf());
*/

/*
 * The code below is used to create an instance of the sanitizer. 
 * This is used to clean "dirty" user input which could contain XSS attacks.
 * We set certain options to only allow certain HTML tags and attributes.
 */

/* const sanitizeHtml = require("sanitize-html");
const sanitizeOptions = {       //these are the options for sanitizing html, we should make it more specific
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
        "a": ["href"]
    },
    allowedIframeHostnames: ["www.youtube.com"] //allow iframes with youtube videos
}
 */

/*
 * The code below is used to set the middleware for the Content Security Policy
 * It uses a nonce for the script-src directive, which is set in the HTML template
 * The handlebars can then access the nonce through the res.locals object which is passed
 * though the middleware
*/
/* const crypto = require('crypto'); 
app.use((req, res, next) => {
    let nonce = crypto.randomBytes(16).toString('base64');
    res.locals.cspNonce = nonce; 
    res.set({
        'Content-Security-Policy':
        `default-src 'self'; script-src 'nonce-${nonce}'`  
    });
    next();
});  */


let listArr = [];
let listResults = [];
let querySearch = ""

app.get("/", (req, res) => {
  res.render("main", { list: listArr });
});

app.post("/add", (req, res) => {
  const item = req.body;
  listArr.push(item);
  res.redirect("/");
});

app.get("/search", (req, res) => {
  if (req.query.q) {
    // query = sanitizeHtml(req.query.q, sanitizeOptions); 
    // res.render("search", { results: listResults, search: query, count: listResults.length, querySearch: querySearch });
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

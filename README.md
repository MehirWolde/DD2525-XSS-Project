# DD2525-XSS-Project
This is a small web application built as a part of a project for the course DD2525 Language Based Security

The app has 2 routes, a main route on "/" and a search route on "/search"

Make sure to only remove comments from mitgation at a time, not multiple at once.

# Testing the application
First run `npm install` when downloading the repo
To run the application either run: `npm run dev` or `node app`

## Testing the web application firewall
To test out the web application firewall, remove the comments around lines 22 and 23 where the package instance (easy-waf) and middleware is commented out.

This will enable the firewall against all requests and can be tested against different XSS attacks. For example a simple test can be inserting the script "<script>alert('hi');</script>" in the name or note field of the start page.

## Testing out the sanitizer
To test out the sanitizer, remove the comments around line 33 to 39 where the santizer and its whitelisted options are.
Then also remove the comments around lines 76 and 77, and also comment out line 78.
The remove the comments arround lines 86, 87 and 88, and comment out line 89.

Now the sanitizer should be enabled against all the user inputs and can be tested against XSS attacks. For example by inserting a script as the query parameter in the URL after searching.

## Testing out the csp using nonces
To test the CSP with nonces simply remove the comments around lines 49  to 57. Now csp should check for any script to include the same nonces thats generated for each request through the middleware.
To test this out, you can for example enter a script into the search field from the search box and search for it to see if its caught or not.

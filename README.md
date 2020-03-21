# Advance NodeJS Hands-on

## Learnings and keywords
1. routes for each resource
2. controller to seperate out logic from routes. each route map to controller
3. middleware
    * functions that access has to req/res cycle and runs wihtin that cycle. It can set values before request goes to any of the routes. next defines the move to next middlware.
  
4. morgan for logger
5. colors for advance console logging
6. to use req.body we need a body parser.
7. every mongoose memthod returns a promise
8. findbyidandupdate does not do validation. we have to mention explicitly
9. customised error handler

[1] Anyway, bodyParser.json() returns a function, and when that function is passed into app.use, it acts just like any other middleware. It may be helpful to think about it like this:
var cb = bodyParser.json();
app.use(cb);




## links
1. body parser: https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
2. colors: https://nodejs.org/en/knowledge/command-line/how-to-get-colors-on-the-command-line/
3. mongo charts: https://www.mongodb.com/blog/post/mongodb-charts-gets-embeddable
4. mongo middlewares:
5. slug: https://medium.com/@thiscodeworks.com/implementing-url-slugs-on-express-node-js-5f5890431dea
6. geocoder: 


## Concepts
1. callback vs promises: 

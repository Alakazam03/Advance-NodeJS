# Advance NodeJS Hands-on

Adavnce nodeJS code practices and tools. This repository provides links to useful tools and concepts needed to get your app production ready.

## Learnings and Keywords

1. routes for each resource
2. controller to seperate out logic from routes. each route map to controller
3. middleware
    * functions that access has to req/res cycle and runs wihtin that cycle. It can set values before request goes to any of the routes. next defines the move to next middlware.
  
4. morgan for logger
5. colors for advance console logging
6. to use req.body we need a body parser.
7. every mongoose method returns a promise
8. findbyidandupdate does not do validation. we have to mention explicitly if updated data is needed.
9. customised error handler

* Anyway, bodyParser.json() returns a function, and when that function is passed into app.use, it acts just like any other middleware. It may be helpful to think about it like this:
var cb = bodyParser.json();
app.use(cb);


### Links

1. Body Parser: <https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90>
2. Colors: <https://nodejs.org/en/knowledge/command-line/how-to-get-colors-on-the-command-line/>
3. Slug: <https://medium.com/@thiscodeworks.com/implementing-url-slugs-on-express-node-js-5f5890431dea>
4. express-fileupload: 
5. Geocoder: <https://www.npmjs.com/package/node-geocoder>
6. json web token: <https://json.io> 
7. cookie parser: <https://www.npmjs.com/package/cookie-parser>
8. Agenda.js: <https://medium.com/hacktive-devs/nodejs-scheduling-tasks-agenda-js-4b6824f9457e>


### Concepts

1. Callback: <http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/>
2. let vs const vs var : <http://javascriptissexy.com/understanding-es2015-in-depth-part-1-block-scope-with-let-and-const/>
3. spread operator


### Third Party Integration

1. AWS SES Integration: <https://medium.com/@maciej.lisowski.elk/nodejs-and-amazon-ses-how-to-send-emails-from-your-application-5c24b1f9b67b>
2. Nodemailer: <https://nodemailer.com/about/>
3. Mail trap: <https://www.mailtrap.io>


### MongoDb and Mongoose

1. queries: <https://mongoosejs.com/docs/queries.html>
2. virtuals: <https://mongoosejs.com/docs/guide.html#virtuals>
3. Mongo Charts: <https://www.mongodb.com/blog/post/mongodb-charts-gets-embeddable>
4. Mongo Statics: <https://stackoverflow.com/questions/39708841/what-is-the-use-of-mongoose-methods-and-statics>, <https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/static-functions-vs-instance-methods>

### Postman

1. Enabling cookies: <https://stackoverflow.com/questions/30890403/sending-cookies-with-postman>


### Security

   1. Sql injection: <express-mongo-sanitize>
   2. Security headers using helmet: <https://helmetjs.github.io/>
   3. XSS: Avoid any html tags inside any text. <https://www.npmjs.com/package/xss-clean>
   4. Rate-limit: <https://github.com/nfriedly/express-rate-limit>
   5. protect against HTTP Parameter Pollution attacks: <https://github.com/analog-nico/hpp>
   6. cors: <https://github.com/expressjs/cors>
   7. ssl: [Detailed thoughts on https](https://www.smashingmagazine.com/2017/06/guide-switching-http-https/)
      1. [setting-up-a-node-js-app-on-a-linux-ami-on-an-aws-ec2-instance-with-nginx](https://medium.com/@nishankjaintdk/setting-up-a-node-js-app-on-a-linux-ami-on-an-aws-ec2-instance-with-nginx-59cbc1bcc68c)
      2. [node-nginx-ec2 setup](https://regbrain.com/article/node-nginx-ec2)
      3. [serving-a-website-on-a-registered-domain-with-https-using-nginx-and-lets-encrypt](https://medium.com/@nishankjaintdk/serving-a-website-on-a-registered-domain-with-https-using-nginx-and-lets-encrypt-8d482e01a682)
   

### Logging

1. [logging best practices](https://blog.bitsrc.io/logging-best-practices-for-node-js-applications-8a0a5969b94c)
2. [guide nodejs blogging](https://www.twilio.com/blog/guide-node-js-logging)
3. [winston example](https://truetocode.com/logging-in-node-js-express-application-using-winston-logger/)

### Best practices

1. [advanced best express practices](https://expressjs.com/en/advanced/best-practice-performance.html#do-logging-correctly)

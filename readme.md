Crfeate a Repository  
Initialise the repository  
node_modules, package.json,package-lock.json
Install Express
Create a server
Listen to port 3000
write handler for test/ , /hello
install nodemon and update the script inside package.json
what a re dependicies

initilise git
.gitignore
create a remote repo on github
Push all code to teh remote orgin

---Order of the route is importat-----
Install postman and nmake a work space and a collection > make a test apicall

Create a logic to handle get, post, patch, put and Delete on postman

While routing if teh url is abc and if there is a ab?c that means c is optional ab will also work

? -> optional (ab?c)

ab(cd)?e -> Here cd is optional

- -> abbbbbbc (ab+c)

* -> star (ab\*c)Starts with ab and end with c

/a/ => rejex if a is in the url it will work

req.query | req.params

use of regex /a/, /.\*fly$/
reading the query params in the routes
reading the dynamic routes
Handling multiple route handlers

- next() and errors along with res.send()
- app.use("route",rH,[rH2,rH3],rH4,rH5)

- what is a middleware and why do we need it
- what a auth middleware fro user and admin

- Read about middleware and how express.js handles behind teh scene

- app.use and app.all What is the differrence

## db connection: document < collection < Database

- Error handling using app.use("/",(err,req,res,next) =>{});
- Create a free cluste in mongodb atlas
- Install mongoose library
- Connect the application to the database <connecrtion url>/devTinder
- call conection db function and connect tot he database befor starting the application

- Create a User schema & user Model
- Create /signup api to add the data in the database
- create some documents using postman

Difference bw JSON and js object

- Add express.ksonn to read teh json and store it to teh db
- Make your SignUp API dynamic to recive data from the end user
- create a delete user API
- Create a Update user API
- Read the documentation for Model
- Waht are options in a model

## Data Samitasation

- API - update the user data with ref to emailId (need to be done)
- explore schema options from the document
- add required,unique, lowercase,min,minLength,trim
- add Default
- Create a custom validation function for gender
- Improve teh DB schema - PUT all the appropriate calidation on each field in Schema
- Add time stamp to the user Schema
- Add API validation for each field
- Use Validator function
- Explore Validator library and use validator for email, password and photoUrl
- Validate data in signup API
- Install bcrypt packagae
- Create a password hash using bcrypt.hash and save the password.
- Create Login API
- Compare Passwords & throw error if email or password is invalid
- install cookie parser
- create a get / profile api if you get back the cookie
- Install JSON web token
- In Login api,after email and pw validation, create a jwt tokenand send it to teh user
- read the cookie inside your profile API and find teh logged in user
- userAuth middleware
- Add the userAuth middleware in the profileAPI and a new connstionSendAPI
- Set the expiry of jwt token for 7 days
- Create Schema user method to get jwt()
- Create UserSchema method to comparepassword(passwordInputByUser)
- Read Documentation
- Create folder for managing auth,profile,request routers
- Create authRoute, profileRouter, requestRouter
- import these router in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Validate all data in every post , PATCH api's

- Create Connection Request Schema
- Send connection Request API
- Think about corner casses
- $and | $or querry read about it and other logical queries
- schema.pre("save")function
- Read the compount index from mongodb

Thought process: POST API Vs GET API

Read about ref & populate to combine the two user schema
https://mongoosejs.com/docs/populate.html {Replace of join from sql Join}

Create GET /user/requests/recived with all checks

- Logic for GET /feed API
- Explore the $nin, $and, $ne and otrher query operator

Pagination :

/feed?page=1&limit=10 => 1-10 .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 .skip(10) & .limit(10)

/feed?page=1&limit=10 => 21-30 .skip(20) & .limit(10)

Skip formula: (page - 1) \* limit

- Created a feed API

- Added Skip , limit and pagination

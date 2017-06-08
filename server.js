// sets dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var swapsRoutes = require("./controllers/swaps_controller.js");
var db = require("./models");

// *** auth part 2 starts; will combine with other code and remove ** when auth work done *****

var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
// NOTE: leave Auth0Strategy capital - constructor
var Auth0Strategy = require("passport-auth0");

// loads environment variables from .env file into process.env
dotenv.load();

// imports routes, giving server access to them
var authRoutes = require("./controllers/auth_controller.js");

// configures Passport to use Auth0
var strategy = new Auth0Strategy({
        domain:       process.env.AUTH0_DOMAIN,
        clientID:     process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:  process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
    }, function(accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
});

// adds the Auth0 strategy to passport framework
passport.use(strategy);

// determines which user data should be stored in the session
passport.serializeUser(function(user, done) {
    done(null, user);
});

// retrieves user data once user is logged in
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// *** auth part 1 ends *******************************************************

// sets port
var port = process.env.PORT || 3000;

// creates an express app instance
var app = express();

// serves static content from the "public" directory 
app.use(express.static(process.cwd() + "/public"));

// parses data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// overrides with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// *** auth part 2 starts; will combine with other code and remove ** when auth work done *****

// logs every request to the console
app.use(express.logger('dev')); 

// parses cookies holding session and users' information
app.use(cookieParser());

// configures session attributes
app.use(session({
    secret: "shhhhhhhhh", // encrypts session identifier
    resave: true, // automatically writes to session store 
    saveUninitialized: true // saves new sessions
}));

// initializes passport
app.use(passport.initialize());

// authenticates the session
app.use(passport.session());

// handles authentication routes
app.use("/", authRoutes);

// *** auth part 2 ends *******************************************************

// sets templating engine to handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// syncs sequelize models, then initiates the listener
db.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log("Listening on " + port);
    });
});

// *** NOTE: This .env setup should only be used for development. For production we should still set 
// --- the environment variables in the standard way (If using Heroku, heroku config:set <variable>=<value>








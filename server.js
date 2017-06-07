
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var swapsRoutes = require("./controllers/swaps_controller.js");
var db = require("./models");

//*** auth part 1 starts; will combine with other code and remove ** when auth work done *****

var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var auth0Strategy = require("passport-auth0");

dotenv.load();

var authRoutes = require("./controllers/auth_controller.js");

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
        domain:       process.env.AUTH0_DOMAIN,
        clientID:     process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:  process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
    }, function(accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//*** auth part 1 ends *******************************************************

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

//*** auth part 2 starts; will combine with other code and remove ** when auth work done *****

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: "shhhhhhhhh",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);

//*** auth part 2 ends *******************************************************

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log("Listening on " + port);
    });
});

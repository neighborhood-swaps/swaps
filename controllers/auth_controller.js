var express = require("express");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
var router = express.Router();

var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
};

/* GET home page. */
router.get("/", function(req, res, next) {
    console.log(JSON.stringify(env));
    res.render("index", { env: env });
});


router.get("/login",
    function(req, res){
        res.render("login", { env: env });
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//redirects the logged in user to user page if authentication succeeds
router.get("/callback",
    passport.authenticate("auth0", { failureRedirect: "/404" }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        // sets a cookie with the user's info?
        //For the cookie to be useful, it needs to store information about the user. 
        //You can do this by slightly modifying your registration and login routes. 
        res.redirect(req.session.returnTo || "/user");
});

router.get("/user", ensureLoggedIn, function(req, res, next) {
    // console.log("res from get /user: " + res);
    res.render("user", { user: req.user });
});

router.get("/404", function(req, res, next) {
    res.render("404");
});

module.exports = router;

// var strategy = new Auth0Strategy({
//     domain: '',
//     clientID: '',
//     clientSecret: '',
//     callbackURL: '/loginapi/callback'
// }, function (accessToken, refreshToken, extraParams, profile, done) {
//     // accessToken is the token to call Auth0 API (not needed in the most cases)
//     // extraParams.id_token has the JSON Web Token
//     // profile has all the information from the user
//     var info = {
//         "profile": profile,
//         "accessToken": accessToken,
//         "refreshToken": refreshToken,
//         "extraParams": extraParams
//     };
//     return done(null, info);
// });
// --simply access the accessToken with the req.user object.

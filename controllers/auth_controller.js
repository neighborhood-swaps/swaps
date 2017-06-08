// sets dependencies
var express = require("express");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
var router = express.Router();

// sets AuthO credentials 
var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
};

// renders home page
router.get("/", function(req, res, next) {
    console.log(JSON.stringify(env));
    res.render("index", { env: env });
});

// renders login 
router.get("/login",
    function(req, res){
        res.render("login", { env: env });
});

// logs user out, then redirects to home page
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});
 
// opens auth0 for authorization, then redirects to user page if authentication succeeds
router.get("/callback",
    passport.authenticate("auth0", { failureRedirect: "/404" }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect(req.session.returnTo || "/user");
});

// ensures user is logged in, then renders user page
router.get("/user", ensureLoggedIn, function(req, res, next) {
    res.render("user", { user: req.user });
});

// renders 404 page 
router.get("/404", function(req, res, next) {
    res.render("404");
});

module.exports = router;


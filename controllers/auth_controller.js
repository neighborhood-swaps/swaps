var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("in get / in index.js");
    console.log(JSON.stringify(env));
    res.render('index', { env: env });
});

router.get('/login',
    function(req, res){
        res.render('login', { env: env });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
        res.redirect(req.session.returnTo || '/user');
});

router.get('/user', ensureLoggedIn, function(req, res, next) {
    res.render('user', { user: req.user });
});

module.exports = router;

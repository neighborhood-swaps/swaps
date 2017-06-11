// sets dependencies
var express = require("express");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
var router = express.Router();


var db = require("../models");
var uuid = require("uuid");
var path = require("path");
var aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET_NAME;

// sets AuthO credentials 
var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
};

// renders home page
router.get("/", function(req, res, next) {
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

// enters user name and phone in db from sign-in form
router.post("/api/user", function(req,res) {
    // if(req.body.name !== "") {
    //     db.Users.create({
    //         name: req.body.name,
    //         phone: req.body.phone
    //       }).then(function() {
    //         res.redirect("/");
    //       }).catch(function(err) {
    //         res.render("400");
    //     });
    // };
});

// renders 404 page 
router.get("/404", function(req, res, next) {
    res.render("404");
});
///////////////////////


router.get('/api/newUser', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/adduser.html"));
});

router.post('/api/postItem', function(req, res) {
console.log(req.body);
    db.Products.create({
        product_name: req.body.prodName,
        category: req.body.categoryInput,
        description: req.body.descriptionInput,
        img_location: "testlocation",
        condition: req.body.conditionInput,
        availabilitiy: req.body.availabilityInput,
        swap_location: req.body.swap_locationInput,
        comments: req.body.commentsInput,
        user_id: req.body.userIDInput,
        UserUserId: req.body.userUserID
    }).then(function() {
        res.redirect("/");
    });
});

router.get('/household', function(req, res) {
    db.Products.findAll({
        where: {
            user_id: 1
        } 
    }).then(function(data) {
        var postData = {
            data: data
        };
        res.render("postReturn", postData);
    });
});

router.get('/furniture', function(req, res) {
    db.Products.findAll({
        where: {
            user_id: 1
        } 
    }).then(function(data) {
        var postData = {
            data: data
        };
        res.render("postReturn", postData);
    });
});

router.get('/tools', function(req, res) {
    db.Products.findAll({
        where: {
            user_id: 1
        } 
    }).then(function(data) {
        var postData = {
            data: data
        };
        res.render("postReturn", postData);
    });
});

router.get('/toys', function(req, res) {
    db.Products.findAll({
        where: {
            user_id: 1
        } 
    }).then(function(data) {
        var postData = {
            data: data
        };
        res.render("postReturn", postData);
    });
});

router.get('/electronics', function(req, res) {
    db.Products.findAll({
        where: {
            user_id: 1
        } 
    }).then(function(data) {
        var postData = {
            data: data
        };
        res.render("postReturn", postData);
    });
});





router.get('/api/upload', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/uploadfile.html"));
    // console.log(S3_BUCKET);
});

router.get('/sign-s3', (req, res) => {
    // console.log(req)
    const s3 = new aws.S3();
    var tmpFileName = req.query['file-name'];
    const fileName = uuid.v4() + tmpFileName;
    const fileType = req.query['file-type'];
    const uname = req.query['uname'];
    const desc = req.query['desc'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {

        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/images/${fileName}`
        };

        // console.log(JSON.stringify(returnData));
        res.write(JSON.stringify(returnData));
        res.end();
    });

});

router.post('/api/addUserToDB', (req, res) => {

    db.Users.create({
        first_name: req.body.fName,
        last_name: req.body.lName,
        user_email: req.body.email,
        user_id: req.body.uname
    }).then(function() {
        res.redirect("/newUser");
    });
});


router.get('/api/getSingleImage/:', function(req, res) {
    db.Products.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });

});

router.get('/api/getAllImages/:', function(req, res) {
    db.Products.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });

});

router.get("/api/posts/category/:category", function(req, res) {
    db.Post.findAll({
            where: {
                category: req.params.category
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });
});

// Need to figure out how to correctly handle this return
router.post('/save-details', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/uploadfile.html"));
});

router.get("/posts", function(req, res) {
    res.render("posts");
});

router.get("/userPosts", function(req, res) {
    res.render("postReturn");
});

router.get("/search", function(req, res) {
    res.render("search");
});

module.exports = router;


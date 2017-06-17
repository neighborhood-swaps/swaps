// sets dependencies
var express = require("express");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
var router = express.Router();
var db = require("../models");
var uuid = require("uuid");
var path = require("path");
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
const S3_BUCKET = process.env.S3_BUCKET_NAME;
s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3_BUCKET,
        key: function(req, file, cb) {
            cb(null, uuid.v4() + file.originalname); //use Date.now() for unique file keys
        }
    })
});

//******************************* CODE FOR AUTH START ***********************************

// sets AuthO credentials
var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
};

//renders home page
router.get("/", function(req, res, next) {
    res.render("index", { env: env });
});

// router.get("/", function(req, res, next) {
//         db.Products.findAll({
//             limit: 9,
//             order: [ [ 'createdAt', 'DESC' ]]
//         })
//         .then(function(dbPosts) {
//             var postData = {
//                 posts: dbPosts
//             };
//             console.log("dbPosts:  " + JSON.stringify(dbPosts));
//             res.render("index", postData, { env: env });
//         });
// });

// renders login
router.get("/login", function(req, res) {
        res.render("login", { env: env });
});

// logs user out, then redirects to home page
router.get("/logout", function(req, res) {
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

// router.get("/user", ensureLoggedIn, function(req, res, next) {
//     db.Products.findAll({
//             limit: 9,
//             order: [ [ 'createdAt', 'DESC' ]]
//         })
//         .then(function(dbPosts) {
//             var postData = {
//                 posts: dbPosts
//             };
//             console.log("dbPosts:  " + JSON.stringify(dbPosts));
//             // res.render("search", postData);
//             res.render("user", { user: req.user }, postData);
//         });
// });

//******************************* CODE FOR AUTH END ***********************************

//*************************** CODE FOR POSTS/SWAPS START ******************************

// retrieves data by category
router.get("/api/posts/:category", function(req, res) {
    console.log("req.user:  " + JSON.stringify(req.user));
    db.Products.findAll({
            where: {
                category: req.params.category
            }
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            }
            if (postData.posts.length > 0) {
                res.render("post_return", postData);
            } else {
                res.redirect("/search");
            }
        });
});

// displays post input form
router.get("/posts", function(req, res) {
    res.render("posts");
});

// displays user's posts
router.get("/userPosts", function(req, res) {
    db.Products.findAll({
            where: {
                user_id: req.user.id
            }
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            };
            console.log("dbPosts:  " + JSON.stringify(dbPosts));
            res.render("post_return", postData);
        });
});

// displays search categories
router.get("/search", function(req, res) {
    db.Products.findAll({
            limit: 9,
            order: [ [ 'createdAt', 'DESC' ]]
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            };
            console.log("dbPosts:  " + JSON.stringify(dbPosts));
            res.render("search", postData);
        });
});

// updates requester info and status when user asks to swap
router.post("/api/swap", function(req, res) {
    db.Products.update(
        {
            requester_id: req.user.id,
            status: "pending"
        }, 
        {
            where: {
                        id: req.body.product
                   }
        }
    );
});

// updates status when user accepts a swap
router.post("/accept", function(req, res) {
    db.Products.update(
        {
            status: "scheduled"
        }, 
        {
            where: {
                        id: req.body.product
                   }
        }
    );
});

// updates status and deletes requester when user rejects a swap
router.post("/reject", function(req, res) {
    db.Products.update(
        {
            requester_id: null,
            status: "open"
        }, 
        {
            where: {
                        id: req.body.product
                   }
        }
    );
});

// updates status and deletes requester when user rescinds a swap
router.post("/rescind", function(req, res) {
    db.Products.update(
        {
            requester_id: null,
            status: "open"
        }, 
        {
            where: {
                        id: req.body.product
                   }
        }
    ).then(function() {
            res.redirect("/made");
        });
});

// updates status and deletes requester when user reposts a post from items lending
router.post("/repost", function(req, res) {
    db.Products.update(
        {
            requester_id: null,
            status: "open"
        }, 
        {
            where: {
                        id: req.body.product
                   }
        }
    ).then(function(dbPosts) {
            res.redirect("/lending");
    });
});

// updates status and deletes requester when user completes a swap
router.post("/complete", function(req, res) {
    db.Products.update(
        {
            requester_id: null,
            status: "open"
        }, 
        {
            where: {
                        id: req.body.product
                   }
        }
    ).then(function(dbPosts) {
            res.redirect("/borrowing");
    });
});

// deletes a post
router.post("/delete", function(req, res) {
    db.Products.destroy(
        {
            where: {
                        id: req.body.product
                   }
        }
    ).then(function(dbPosts) {
            res.redirect("/lending");
    });
});

// displays offers received
router.get("/received", function(req, res) {
    db.Products.findAll({
            where: {
                user_id: req.user.id,
                status: "pending" 
            }
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            };
            res.render("offers_received_return", postData);
        });
});

// displays offers made
router.get("/made", function(req, res) {
    db.Products.findAll({
            where: {
                requester_id: req.user.id,
                status: "pending" 
            }
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            };
            res.render("offers_made_return", postData);
        });
});

// displays items scheduled to lend
router.get("/lending", function(req, res) {
    db.Products.findAll({
            where: {
                user_id: req.user.id,
                status: "scheduled" 
            }
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            };
            res.render("items_lending", postData);
        });
});

// displays items scheduled to borrow
router.get("/borrowing", function(req, res) {
    db.Products.findAll({
            where: {
                requester_id: req.user.id,
                status: "scheduled" 
            }
        })
        .then(function(dbPosts) {
            var postData = {
                posts: dbPosts
            };
            res.render("items_borrowing", postData);
        });
});

//adds post form data to db then redirects to user page
router.post('/api/postItem', upload.array('upl', 1), function(req, res) {
    db.Products.create({
        user_name: req.body.nameInput,
        category: req.body.categoryInput,
        description: req.body.descriptionInput,
        img_location: req.files[0].location,
        prod_condition: req.body.conditionInput,
        availability: req.body.availabilityInput,
        swap_location: req.body.swap_locationInput,
        comments: req.body.commentsInput,
        user_id: req.user.id
    }).then(function() {
        res.redirect("/user");
    });
});

// renders 404 page
router.get("/404", function(req, res, next) {
    res.render("404");
});

//*************************** CODE FOR POSTS/SWAPS END ******************************

//**************************** CODE FOR IMAGES START ********************************

router.get('/api/newUser', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/adduser.html"));
});

router.get('/api/upload', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/uploadfile.html"));
});

router.get('/sign-s3', (req, res) => {
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

// Need to figure out how to correctly handle this return
router.post('/save-details', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/uploadfile.html"));
});

//**************************** CODE FOR IMAGES END ********************************

module.exports = router;


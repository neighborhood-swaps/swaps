var express = require("express");
var app = express.Router();
var db = require("../models");
var uuid = require("uuid");
var path = require("path");
var aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET_NAME;

app.get('/api/newUser', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/adduser.html"));

});

app.post('/api/postItem', function(req, res) {

    db.Products.create({
        product_name: req.body.prodName,
        category: req.body.category,
        product_description: req.body.description,
        img_location: req.body.img,
        condition: req.body.condition,
        availabilitiy: req.body.available,
        swap_location: req.body.location,
        comments: req.body.comments,
        user_id: req.body.user_id
    }).then(function() {
        res.render("/posts", );
    });

});



app.get('/api/upload', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/uploadfile.html"));
    // console.log(S3_BUCKET);
});

app.get('/sign-s3', (req, res) => {
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

app.post('/api/addUserToDB', (req, res) => {

    db.Users.create({
        first_name: req.body.fName,
        last_name: req.body.lName,
        user_email: req.body.email,
        user_id: req.body.uname
    }).then(function() {
        res.redirect("/newUser");
    });
});


app.get('/api/getSingleImage/:', function(req, res) {
    db.Products.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });

});


app.get('/api/getAllImages/:', function(req, res) {
    db.Products.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });

});

app.get("/api/posts/category/:category", function(req, res) {
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
app.post('/save-details', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/uploadfile.html"));
});

app.get("/posts", function(req, res) {
    res.render("posts");
});

module.exports = app;
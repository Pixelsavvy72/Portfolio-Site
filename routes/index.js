var express = require("express");
var router = express.Router(); 
var passport = require("passport");
var Project = require("../models/project");
var User = require("../models/user");
var middleware = require("../middleware/middleware");

router.get("/", function(req, res) {
   res.redirect("/home"); 
});

// INDEX ROUTE
router.get("/home", function(req, res) {
    Project.find({}, function(err, allProjects){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {projects: allProjects})
        }    
    });
});

// NEW - PROJECT FORM ROUTE
router.get("/new", middleware.checkAdminRole, function(req, res){
    res.render("new");
});

//====================
//  AUTH ROUTES
//====================


// REGISTER ROUTE
router.get("/register", function(req, res){
    res.render("register"); 
});

// REGISTER POST ROUTE
router.post("/register", function(req, res){
    var newUser = new User({ username : req.body.username });
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
    res.redirect("/");
    })
});

//LOGIN ROUTE
router.get("/login", function(req, res){
   res.render("login"); 
});

//LOGIN POST ROUTE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home"); 
});

module.exports = router;
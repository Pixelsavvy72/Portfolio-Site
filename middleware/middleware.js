var Project = require("../models/project")

var middlewareObj = {};

middlewareObj.checkAdminRole = function(req, res, next) {
    if(req.isAuthenticated && req.user.username === "Craig") {
        return next();
    }
    req.flash("error", "Please login as an administrator");
    res.redirect("/login");
};

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first.");
    res.redirect("/login");
};

middlewareObj.checkProjectOwnership = function(req, res, next) {
    // is user logged in. If not, redirect
    if (req.isAuthenticated()) {
        Project.findById(req.params.id, function(err, foundProject){
            if (err) {
                req.flash("error", "Project not found");
                res.redirect("back");
            } else {
                // Does user own project? Otherwise, redirect.
                if (foundProject.author.id.equals(req.user._id) && req.user.username === "Craig") {
                    //if owner and user are same, go back to caller and continue
                    next();
                } else {
                    req.flash("error", "You are not authorized to perform that action.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login.");
        res.redirect("/login");
    }
};


module.exports = middlewareObj;
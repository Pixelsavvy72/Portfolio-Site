var express = require("express");
var router = express.Router(); 
var Project = require("../models/project");
var middleware = require("../middleware/middleware");

// ========================
// PROJECT ROUTES
// ========================


// SHOW - SELECTED PROJECT DETAILS ROUTE
router.get("/:id", function(req, res){
     Project.findById(req.params.id, function(err, foundProject){
         if (err) {
             console.log(err);
         } else {
             res.render("projects", {foundProject: foundProject});
         }
     });
});




// CREATE - NEW PROJECT ROUTE
router.post("/", middleware.checkAdminRole, function(req, res){
    var order = req.body.order;
    var title = req.body.title;
    var thumbnail = req.body.thumbnail;
    var optionalImg1 = req.body.optionalImg1;
    var optionalImg2 = req.body.optionalImg2;
    var optionalImg3 = req.body.optionalImg3;
    var tech = req.body.tech;
    var description = req.body.description;
    var descriptionFull = req.body.descriptionFull;
    var githubLink = req.body.githubLink;
    var exampleLink = req.body.exampleLink;
    var functionality = req.body.functionality;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newProject = {
        order: order, title: title, thumbnail: thumbnail, optionalImg1: optionalImg1, 
        optionalImg2: optionalImg2, optionalImg3: optionalImg3, tech: tech, 
        description: description, descriptionFull: descriptionFull,
        githubLink: githubLink, exampleLink: exampleLink, functionality: functionality, author : author};
    Project.create(newProject, function(err, thisProject){
        if (err) {
           console.log(err);
           res.render("new");
        } else {
           res.redirect("/");
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkProjectOwnership, function(req, res) {
    Project.findById(req.params.id, function(err, foundProject){
        if (err) {
            res.redirect("back");
        } else {
            res.render("edit", {project : foundProject} );
        }   
    });
});

// UPDATE ROUTE
//TODO: Get functionality list working
router.put("/:id", function(req, res){
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject){
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/projects/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id", function(req, res){
   Project.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
   }); 
});


module.exports = router;
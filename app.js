var express                 = require("express"),
    app                     = express(),
    request                 = require("request"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    middleware              = require("./middleware/middleware"),
    Project                 = require("./models/project");
    
var projectRoutes           = require("./routes/projects"),
    indexRoutes             = require("./routes/index");
    
//TODO:
// Move NEW PROJECT route to projects.js
    
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost/portfolio");
// mongoose.connect("mongodb://Craig:thorcp@ds143151.mlab.com:43151/portfolio_deployed");



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

//PASSPORT SETUP
app.use(require("express-session")({
    secret: "In the end we're all just dust in the wind dude",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/", indexRoutes);
app.use("/projects", projectRoutes);





// LISTEN
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Portfolio server has been started.");
});

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    mongoose        = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride  = require("method-override"),
    User            = require("./models/user.js"),
    Parcel          = require("./models/parcel.js"),
    Order           = require("./models/order.js");
mongoose.Promise    = Promise;

var indexRoutes     = require("./routes/indexRoutes.js");
var courierRoutes   = require("./routes/courierRoutes.js");
var billingRoutes   = require("./routes/billingRoutes.js");
mongoose.connect("mongodb://localhost/postman_db1", {
    useMongoClient: true
});
//=====AppConfig=====//
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "blah blah blah",
    resave: false,
    saveUninitialized: false
}));
//=========Passport config ==========//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));
//=========routes=================//
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
app.use(indexRoutes);
app.use(courierRoutes);
app.use(billingRoutes);
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
      return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.ID,function(){
   console.log("SERVER STARTED!!!"); 
});
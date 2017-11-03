var express = require("express");
var router = express.Router();
var Order   = require("../models/order.js");
router.post("/billing",isLoggedIn,function(req,res){
    var order_req ={
        type: req.body.type,
        number: req.body.number,
        service: req.body.service,
        user_id: req.user._id+"",
        user_name:req.user.username+""
    };
    Order.create(order_req,function(err,order){
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.render("bill",{order_req: order});
       }
    });
    
});

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;
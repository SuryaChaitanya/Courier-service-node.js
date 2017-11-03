var express = require("express");
var router  = express.Router();
var Parcel  = require("../models/parcel.js");

router.get("/courier",isLoggedIn,function(req,res){
     var user_parcels = [];
   Parcel.find({},function(err,all_parcels){
      if(err)
      {
          console.log(err);
      }
      else
      {
         
         all_parcels.forEach(function(seed){
             if(seed.user_id && seed.user_id+"" === req.user._id+"")
             {
                user_parcels.push(seed);
                
             }
         });
         res.render("courier",{parcels: user_parcels});
      }
   });
   
});
   
router.post("/courier",isLoggedIn,function(req,res){
    var parcel = {
        sender: req.body.sender,
        receiver    : req.body.receiver,
        user_id : req.user._id+"",
        order_id: req.body.order_id+""
    };
    console.log(parcel);
    Parcel.create(parcel,function(err,seed){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/courier");
        }
    })
});
router.get("/courier/:id",isLoggedIn,function(req,res){
   Parcel.findById(req.params.id,function(err,seed){
      if(err)
      {
          console.log(err);
      }
      else
      {
          console.log(seed);
          res.render("show",{parcel_details: seed});
      }
   }); 
});
router.delete("/courier/:id",isLoggedIn,function(req,res){
   Parcel.findByIdAndRemove(req.params.id,function(err){
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.redirect("/courier");
       }
   }) ;
});
router.get("/courier/:id/edit",isLoggedIn,function(req,res){
   Parcel.findById(req.params.id,function(err,seed){
       if(err)
       {
           console.log(err);
       }
       else
       {
            res.render("edit",{parcel_details: seed}); 
       }
   })
  
});
router.put("/courier/:id",function(req,res){
    console.log("Check check check");
  
     var parcel = {
        sender: req.body.sender,
        receiver    : req.body.receiver,
        user_id : req.user._id+"",
    };
   Parcel.findByIdAndUpdate(req.params.id,parcel,function(err,seed){
       if(err)
       {
           console.log(err);
       }
       else
       {
           console.log("SEnddddddd");
           res.redirect("/courier");
       }
   }) ;
});
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
};
module.exports = router;
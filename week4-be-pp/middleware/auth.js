function authorizeUserAcces(req,res,next){
    if(req.query.admin=== 'true'){
        next();
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}

module.exports = authorizeUserAcces;
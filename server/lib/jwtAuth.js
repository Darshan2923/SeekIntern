import passport from "passport";

export const jwtAuth=(req,res,next)=>{
    passport.authenticate("jwt",{session:false},function (err,user,info){
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json(info);
        }
        res.user=user;
        next();
    })(req,res,next);
};
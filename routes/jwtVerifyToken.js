const jsonWebToken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//  Create middleware to verify token when updating or deleting 
const jwtVerifyToken = (req, res, next) => {
    //  get TOKEN from Headers
    const authorizationHeader = req.headers.token;
    //  if TOKEN is present
    if(authorizationHeader){
        //  remove the space between "Bearer" and "TOKEN number". this is the second element in the header.
        const token = authorizationHeader.split(" ")[1];
        //  verify method,     evaluate token   return error OR userData 
        jsonWebToken.verify(token, process.env.JWT_KEY, (err, user) => {
            //  if error
            if(err) res.status(403).json('This Token is not valid!');
            // if ok, user dat
            req.user = user;
            // leave function and continue in router
            next();
        }) 
    } else {
        // if no token is located in Header
        return res.status(401).json("You Are Not Authorized!");
    }
}

//Create function to verify token and authorization status
function verifyTokenAndAuthorization(req, res, next){
    jwtVerifyToken(req, res, ()=>{
        //  if user id in TOKEN is EQUAL to that entered by user OR is admin 
        if(req.user.id === req.params.id || req.user.isAdmin){
            //  continue
            next();
        } else {
            res.status(403).json("Not authorized or an administrator")
        }
    })
}

//Create function to verify admin status
function verifyTokenAndAdmin(req, res, next){
    jwtVerifyToken(req, res, ()=>{
        //  if user id in TOKEN is EQUAL to that entered by user OR is admin 
        if(req.user.isAdmin){
            //  continue
            next();
        } else {
            res.status(403).json("Not authorized or an administrator")
        }
    })
}


module.exports = { 
    jwtVerifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
}
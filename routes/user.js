const router = require("express").Router();
const User = require('../models/User');
const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
const CryptoJS = require('crypto-js');


//  Crud operations for user
//  Find user by Id
router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id)
    console.log(id)
    if(user) return res.status(200).json({user})
    if(!user){
        res.status(404).send('User not found')
        return;  // return to prevent server crash
        }
    throw new Error('item not found')
    }
)

//  UPDATE with JWT Verification Middleware.  Also See if Token is Admin or NOT
//  veryify token or admin status
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    //  if password is present
    if(req.body.password){
        //  encrypt password
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTO_PHRASE
        ).toString();
    }
    try{
        // update user details to a variable
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body },{ new: true } );
        //  show updated user details
        res.status(200).json(updatedUser);
        
    } catch (err){
        res.status(500).json(err);
    }
})

// router.delete('/user', ver)

// //  UPDATE WITHOUT JWT
// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     User.findByIdAndUpdate(id, req.body, {new: true}, (err, user) => {
//         if(err){
//             res.status(500).send(err)
//             return;     //exit block to prevent server crash
//         }
//         if(!user){
//             res.status(500).send('User not found')
//             return; //exit block to prevent server crash
//         }
//     });
//     res.send('User updated Successfully')
// })



// //  Delete user by id
// router.delete('/:id', async(req, res)=>{
//     const {id} = req.params;
//     const deleted = await User.findByIdAndDelete(id)
//     console.log(id)
//     if(!deleted){ 
//         res.status(404).send('User Not Found'); 
//         return  //  return to prevent server crash
//      }
//     if(deleted){return res.status(200).send('User Deleted')
// }
// throw new Error('item not found')
//     }
// )

module.exports = router;
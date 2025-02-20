// const jwt = require('jsonwebtoken')

// exports.tokenSecure = async (req, res , next) => {
//     try {
        
//         console.log('hello');
        
//         const token = req.headers.authorization
//         console.log(token);
        
//         if(!token) throw new Error('Attach Token')
//         const tokenVerify = jwt.verify(token,'surat')
//         console.log(tokenVerify);
    
//         const userVerify = await userModel.findById(tokenVerify.id) 
//         console.log(userVerify);
        
//         if(!userVerify) throw new Error ('User Not Found')
        
//         next()
//     } catch (error) {
//         res.status(404).json({
//             status: 'Fail',
//             Message: error.message
//         })
//     }
// }

exports.tokenSecure = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) throw new Error('Token missing or malformed');
        
        const tokenVerify = jwt.verify(token, 'surat');
        const userVerify = await userModel.findById(tokenVerify.id);
        if (!userVerify) throw new Error('User Not Found');
        
        next();
    } catch (error) {
        res.status(401).json({
            status: 'Fail',
            Message: error.message,
        });
    }
};

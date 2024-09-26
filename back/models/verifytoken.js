const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
 const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token is given.' });
    }
    try {
        const tokensecret = jwt.verify(token, 'abc');
        req.user = tokensecret;
        next();
    } catch (error) {
        return res.status(400).json({ message:'Invalid.token.' });
    }
}; module.exports = verifyToken;

const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();

function authenticateToken(req, res, next) {
  
  const token = req.headers['authorization'].split(' ')[1];
  
    const secretKey =process.env.JWT_SECRET_KEY;

    if (!token) {
      return res.status(401).json({status:false, error: 'Unauthorized: Missing token' });
    }
      // Check if the token is in the blacklist
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ status:false, message: 'Token revoked. Please log in again.' });
  }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ status:false, error: 'Forbidden: Invalid token' });
      }
  
      req.user = user;
      next();
    });
}
const logout =(req,res)=>{
  
  tokenBlacklist.add(req.headers.authorization.split(' ')[1]);
  res.json({ 
    status:true,
    message: 'Logout successful' });
}
module.exports = {authenticateToken,logout};
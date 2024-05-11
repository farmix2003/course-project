import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function generateToken(user) {
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token;
}
function authenticateToken(req, res, next) {

    const token = req.cookies.jwt;


    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }


    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
}
export { generateToken, authenticateToken }
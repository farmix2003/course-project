import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function generateToken(user) {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token;
}
function authenticateToken(req, res, next) {

    const header = req.headers.authorization
    const token = header && header.split(' ')[1];

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
const authorizeCollectionAccess = async (req, res, next) => {
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        if (req.user.id !== collection.user_id || req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "You are not authorized to perform this action" });
        }

        next();
    } catch (error) {
        console.log("Error authorizing collection access", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export { generateToken, authenticateToken, authorizeCollectionAccess }
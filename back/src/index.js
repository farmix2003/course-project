import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookiesParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { generateToken, authenticateToken } from './auth.js';
const app = express()
app.use(bodyParser.json())
app.use(cookiesParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

dotenv.config()
mongoose.connect(`mongodb+srv://ffarrux386:zr9zltWsSQpAB3lZ@cluster0.dvpgy9v.mongodb.net/mern`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: { type: String, unique: true },
    password: String,
    status: { type: String, default: 'active' },
    role: { type: String, default: 'regular user' }
})
const collectionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    author: String,
    status: String,
    category: String,
    tags: String,
    last_updated: { type: Date, default: Date.now },
    creation_date: { type: Date, default: Date.now }
})

const collectionItemsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    author: String,
    status: String,
    category: String,
    tags: String,
    last_updated: { type: Date, default: Date.now },
    creation_date: { type: Date, default: Date.now },
    comments: Array,
    likes: Array
})

const User = mongoose.model('User', userSchema);
const Collections = mongoose.model('Collection', collectionSchema);
const CollectionItems = mongoose.model('CollectionItem', collectionItemsSchema)
const router = express.Router()

app.use(router)
app.get('/api/users/get-users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.log("Error to get users", error);
        throw new Error
    }
})

router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user || user.password !== password) {
            return res.status(404).json({ success: false, message: 'Email or password is invalid' })
        }
        if (user.status === 'blocked') {
            res.status(403).json({ success: false, message: 'Your account is blocked' })
        }
        const token = generateToken(user)

        console.log("Successfully logged in")
        return res.status(200).json({ success: true, message: 'Successfully logged in', token })
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: 'Failed to login user' });
    }
})

router.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUsersCount = await User.countDocuments();
        let role = 'regular user';
        if (existingUsersCount === 0) {
            role = 'admin';
        }
        const newUser = {
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password,
            role
        };
        await User.create(newUser);
        console.log('User registered successfully');
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Failed to register user' });
    }
});

router.put('/api/users/block', authenticateToken, async (req, res) => {
    const { ids } = req.body
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' })
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { status: 'blocked' })
        console.log('User blocked successfully');
        res.status(200).json({ success: true, message: 'User blocked successfully' })
    } catch (e) {
        console.log('Error while trying to block user');
        res.status(500).json({ success: false, message: 'Error while trying to block user' })
    }
})

router.put('/api/users/unblock', authenticateToken, async (req, res) => {
    const { ids } = req.body
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' })
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { status: 'active' })
        console.log('User blocked successfully');
        res.status(200).json({ success: true, message: 'User unblocked successfully' })
    } catch (e) {
        console.log('Error while trying to block user');
        res.status(500).json({ success: false, message: 'Error while trying to unblock user' })
    }
})

router.put('/api/users/add-admin', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' })
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { role: 'admin' })
        console.log('User added as admin successfully');
        res.status(200).json({ success: true, message: 'User added as admin successfully' })
    } catch (err) {
        console.log('Error while trying to add admin');
        res.status(500).json({ success: false, message: 'Error while trying to add admin' })
    }
})
router.put('/api/users/remove-admin', authenticateToken, async (req, res) => {
    const { ids } = req.body
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' })
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { role: 'regular user' })
        console.log('User removed as admin successfully');
        res.status(200).json({ success: true, message: 'User removed as admin successfully' })
    } catch (error) {
        console.log('Error while removing user', error);
        res.status(500).json({ success: false, message: 'Error while trying to remove admin' })
    }
})

router.delete('/api/users/delete', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' })
    }
    try {
        await User.deleteMany({ _id: { $in: ids } })
        console.log('User deleted successfully');
        res.status(200).json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
        console.log("Error deleting user", error);
        res.status(500).json({ success: false, message: 'Failed to delete user' })
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
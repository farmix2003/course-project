import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.json())
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
app.get('/api/users/get-users', async (req, res) => {
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
        console.log("Successfully logged in")
        return res.status(200).json({ success: true, message: 'Successfully logged in' })
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
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
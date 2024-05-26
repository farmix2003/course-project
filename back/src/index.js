import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { generateToken, authenticateToken } from './auth.js';

const app = express();
dotenv.config();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'active' },
    role: { type: String, default: 'regular user' }
});

const collectionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, maxlength: 100 },
    description: String,
    category: String,
    image: String,
    user_id: String,
    customFields: [{
        state: Boolean,
        name: String
    }]
});

const collectionItemsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    tags: [{ type: String }],
    customFields: [{
        name: String,
        value: mongoose.Schema.Types.Mixed
    }],
    comments: [{
        userId: String,
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],
    likes: [{ type: String }],
    collectionId: { type: mongoose.Schema.ObjectId, ref: 'Collection' },
    last_updated: { type: Date, default: Date.now },
    creation_date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Collection = mongoose.model('Collection', collectionSchema);
const CollectionItems = mongoose.model('CollectionItem', collectionItemsSchema);

// Routes setup
const router = express.Router();
app.use(router);

const authorizeCollectionAccess = async (req, res, next) => {
    try {
        const collectionId = req.params.collectionId || req.params.id;
        const userId = req.user.id;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (collection.user_id !== userId && user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "You are not authorized to perform this action" });
        }

        next();
    } catch (error) {
        console.log("Error authorizing collection access", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// User routes

app.get('/api/users/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
    }
});

router.get('/api/users/get-users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error to get users:", error);
        res.status(500).json({ success: false, message: 'Failed to get users' });
    }
});

router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(404).json({ success: false, message: 'Email or password is invalid' });
        }
        if (user.status === 'blocked') {
            return res.status(403).json({ success: false, message: 'Your account is blocked' });
        }
        const token = generateToken(user);

        return res.status(200).json({ success: true, message: 'Successfully logged in', token, userId: user._id });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: 'Failed to login user' });
    }
});

router.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUsersCount = await User.countDocuments();
        let role = 'regular user';
        if (existingUsersCount === 0) {
            role = 'admin';
        }
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password,
            role
        });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Failed to register user' });
    }
});

router.put('/api/users/block', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' });
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { status: 'blocked' });
        res.status(200).json({ success: true, message: 'User blocked successfully' });
    } catch (e) {
        console.error('Error while trying to block user:', e);
        res.status(500).json({ success: false, message: 'Error while trying to block user' });
    }
});

router.put('/api/users/unblock', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' });
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { status: 'active' });
        res.status(200).json({ success: true, message: 'User unblocked successfully' });
    } catch (e) {
        console.error('Error while trying to unblock user:', e);
        res.status(500).json({ success: false, message: 'Error while trying to unblock user' });
    }
});

router.put('/api/users/add-admin', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' });
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { role: 'admin' });
        res.status(200).json({ success: true, message: 'User added as admin successfully' });
    } catch (err) {
        console.error('Error while trying to add admin:', err);
        res.status(500).json({ success: false, message: 'Error while trying to add admin' });
    }
});

router.put('/api/users/remove-admin', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' });
    }
    try {
        await User.updateMany({ _id: { $in: ids } }, { role: 'regular user' });
        res.status(200).json({ success: true, message: 'User removed as admin successfully' });
    } catch (error) {
        console.error('Error while removing admin:', error);
        res.status(500).json({ success: false, message: 'Error while trying to remove admin' });
    }
});

router.delete('/api/users/delete', authenticateToken, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ success: false, message: 'Invalid IDs provided' });
    }
    try {
        await User.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: 'Failed to delete user' });
    }
});

router.post('/api/users/logout', (req, res) => {
    res.status(200).json({ success: true, message: "Successfully logged out" });
});

// Collection routes
router.post('/api/collections', authenticateToken, async (req, res) => {
    try {
        const { title, description, category, image, customFields } = req.body;
        const user_id = req.user.id;
        const newCollection = new Collection({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            category,
            image,
            user_id,
            customFields
        });
        await newCollection.save();
        res.status(200).json(newCollection);
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ success: false, message: 'Failed to create collection' });
    }
});

router.delete('/api/collections/:collectionId', authenticateToken, authorizeCollectionAccess, async (req, res) => {
    try {
        const collectionId = req.params.collectionId;
        console.log("Received collection ID: ", collectionId); // Log the received collection ID

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            console.log("Collection not found for ID: ", collectionId); // Log if collection not found
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        await CollectionItems.deleteMany({ collectionId: collection._id });
        await Collection.deleteOne({ _id: collection._id })

        console.log('Collection deleted successfully'); // Log successful deletion
        res.status(200).json({ success: true, message: 'Collection deleted successfully' });
    } catch (error) {
        console.log('Error deleting collection', error); // Log the error details
        res.status(500).json({ success: false, message: 'Failed to delete collection' });
    }
});

router.get('/api/collections', async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (error) {
        console.error('Error getting collections:', error);
        res.status(500).json({ success: false, message: 'Failed to get collections' });
    }
});

router.get('/api/collections/:collectionId', authenticateToken, async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }
        res.status(200).json(collection);
    } catch (error) {
        console.error("Error fetching collection:", error);
        res.status(500).json({ success: false, message: "Failed to fetch collection" });
    }
});


router.put('/api/collections/:collectionId/edit', authenticateToken, authorizeCollectionAccess, async (req, res) => {
    try {
        const collectionId = req.params.collectionId;
        const { title, description, category, image, customFields } = req.body;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        collection.title = title;
        collection.description = description;
        collection.category = category;
        collection.image = image;
        collection.customFields = customFields;

        await collection.save();
        res.status(200).json(collection);
    } catch (error) {
        console.error("Error updating collection:", error);
        res.status(500).json({ success: false, message: 'Failed to update collection' });
    }
});

router.post('/api/collections/:collectionId/items', authenticateToken, async (req, res) => {
    try {
        const { title, tags, customFieldValues } = req.body;
        const collectionId = req.params.collectionId;

        console.log("Request Body:", req.body);

        if (!title || !tags || !customFieldValues) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        const customFields = collection.customFields.map(field => {
            const value = customFieldValues[field.name];
            if (field.state && !value) {
                throw new Error(`Missing required field: ${field.name}`);
            }
            return { name: field.name, value };
        });

        const newCollectionItem = new CollectionItems({
            _id: new mongoose.Types.ObjectId(),
            title,
            tags,
            customFields,
            collectionId,
        });

        await newCollectionItem.save();
        res.status(201).json(newCollectionItem);
    } catch (error) {
        console.error('Error creating collection item:', error);
        res.status(500).json({ success: false, message: 'Failed to create collection item' });
    }
});
router.get('/api/collections/:collectionId/items', authenticateToken, async (req, res) => {
    const collectionId = req.params.collectionId;
    console.log('Collection ID:', collectionId);
    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
        return res.status(400).json({ success: false, message: "Invalid Collection ID" });
    }
    try {
        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const items = await CollectionItems.find({ collectionId });
        res.status(200).json({ success: true, items });
    } catch (error) {
        console.error('Error while getting collection items:', error);
        res.status(500).json({ success: false, message: 'Failed to get collection items' });
    }
});

router.put('/api/collections/:collectionId/items/:itemId', authenticateToken, authorizeCollectionAccess, async (req, res) => {
    try {
        const { collectionId, itemId } = req.params;
        const { title, tags, customFields } = req.body;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        const updatedItem = await CollectionItems.findOneAndUpdate(
            { _id: itemId, collectionId },
            { title, tags, customFields },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: 'Collection item not found' });
        }

        res.status(200).json({ success: true, message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        console.error('Error updating collection item:', error);
        res.status(500).json({ success: false, message: 'Failed to update collection item' });
    }
});

router.delete('/api/collections/:collectionId/items/:itemId', authenticateToken, authorizeCollectionAccess, async (req, res) => {
    try {
        const { collectionId, itemId } = req.params;

        console.log("Delete request parameters:", { collectionId, itemId });

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const deletedItem = await CollectionItems.findOneAndDelete({ _id: itemId, collectionId });
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: 'Collection item not found' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting collection item:', error);
        res.status(500).json({ success: false, message: 'Failed to delete collection item' });
    }
});

router.post('/api/collections/:collectionId/items/:itemId/comments', authenticateToken, async (req, res) => {
    try {
        const { collectionId, itemId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const item = await CollectionItems.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Collection item not found' });
        }

        item.comments.push({ userId, text, createdAt: new Date() });
        await item.save();
        console.log("added comment: ", userId, text);
        res.status(200).json({ success: true, message: 'Comment added successfully', item });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ success: false, message: 'Failed to add comment' });
    }
});

router.get('/api/collections/:collectionId/items/:itemId/comments', authenticateToken, async (req, res) => {
    try {
        const { collectionId, itemId } = req.params;
        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        const item = await CollectionItems.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Collection item not found' });
        }
        res.status(200).json({ success: true, comments: item.comments });
    } catch (err) {
        console.error('Error getting comments:', err);
        res.status(500).json({ success: false, message: 'Failed to get comments' });
    }
})

router.post('/api/collections/:collectionId/items/:itemId/like', authenticateToken, async (req, res) => {
    try {
        const { collectionId, itemId } = req.params;
        const userId = req.user.id;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const item = await CollectionItems.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Collection item not found' });
        }

        if (item.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: 'Item already liked by the user' });
        }
        item.likes.push(userId);
        await item.save();

        res.status(200).json({ success: true, message: 'Item liked successfully', item });
    } catch (error) {
        console.error('Error liking collection item:', error);
        res.status(500).json({ success: false, message: 'Failed to like collection item' });
    }
});

router.post('/api/collections/:collectionId/items/:itemId/unlike', authenticateToken, async (req, res) => {
    try {
        const { collectionId, itemId } = req.params;
        const userId = req.user.id;

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const item = await CollectionItems.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Collection item not found' });
        }

        if (!item.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: 'Item not liked by the user' });
        }
        item.likes = item.likes.filter(id => id !== userId);
        await item.save();

        res.status(200).json({ success: true, message: 'Item unliked successfully', item });
    } catch (error) {
        console.error('Error unliking collection item:', error);
        res.status(500).json({ success: false, message: 'Failed to unlike collection item' });
    }
});



router.get('/api/tags', async (req, res) => {
    const { prefix } = req.query;
    try {
        const tags = await CollectionItems.aggregate([
            { $unwind: "$tags" },
            { $match: { tags: { $regex: `#^${prefix}`, $options: 'i' } } },
            { $group: { _id: null, tags: { $addToSet: "$tags" } } },
            { $project: { _id: 0, tags: 1 } }
        ]);

        res.status(200).json(tags.length > 0 ? tags[0].tags : []);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Failed to fetch tags' });
    }
});


// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Server setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

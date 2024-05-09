import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.json())
export default mongoose.connect(`mongodb+srv://ffarrux386:zr9zltWsSQpAB3lZ@cluster0.dvpgy9v.mongodb.net/mern`);

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


app.get('api/users/get-users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.log("Error to get users", error);
        throw new Error
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
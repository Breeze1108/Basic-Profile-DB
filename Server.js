require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const PostModel = require('./models/Post');


const app = express();
const PORT = process.env.PORT;


app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {console.log('Connected to MongoDB')}, err => {console.log(`Cannot connect to DB ${err}`)});


app.get('/', (req, res) => res.status(200).send('Server Is Running.'));

app.post('/add-post', (req, res) => {
    const incomingData = req.body;
    try {
        const newPost = new PostModel(incomingData);
        newPost.save();

        res.status(200).send({
            message: 'saved',
            // profile: incomingData
        })
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-all-posts', async (req, res) => { 
    try {
        const allPosts = await PostModel.find()
        res.status(200).send({
            message: 'posts-retrieved',
            profile: allPosts,
        })
    }
        catch (err) {
        console.log(err);
    } 
});

app.delete("/post/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPost = await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({
            message: 'deleted',
            userId: deletedPost
    
        });
    }
        catch (err) {
            console.log(err);
        }
    
 
});

app.listen(PORT, () => {
    console.log(`Server is running https://localhost:${PORT}`);
});
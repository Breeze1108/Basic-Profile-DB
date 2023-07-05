require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const ProfileModel = require('./models/Profiles');


const app = express();
const PORT = process.env.PORT;


app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {console.log('Connected to MongoDB')}, err => {console.log(`Cannot connect to DB ${err}`)});


app.get('/', (req, res) => res.status(200).send('Server Is Running.'));

app.post('/add-profile', (req, res) => {
    const incomingData = req.body;
    try {
        const newProfile = new ProfileModel(incomingData);
        newProfile.save();

        res.status(200).send({
            message: 'saved',
            profile: incomingData
        })
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-all-profiles', async (req, res) => { 
    try {
        const allProfiles = await ProfileModel.find()
        res.status(200).send({
            message: 'profiles-retrieved',
            profile: allProfiles,
        })
    }
        catch (err) {
        console.log(err);
    } 
});

app.delete("/profiles/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProfile = await ProfileModel.findByIdAndDelete({_id:id})
        res.status(200).send({
            message: 'deleted',
            userId: deletedProfile
    
        });
    }
        catch (err) {
            console.log(err);
        }
    
 
});

app.listen(PORT, () => {
    console.log(`Server is running https://localhost:${PORT}`);
});
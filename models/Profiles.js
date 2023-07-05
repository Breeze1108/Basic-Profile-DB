const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: {type: String, default:""},
        birthyear: {type: Number, default: 0},
        status: {type: Boolean, default: false},
    },
    {
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn",
        },
        toJSON: {virtuals: true },
        toObject: {virtuals: true },
        }
);

const ProfileModel = mongoose.model('profiles-challenge', schema);

module.exports = ProfileModel;
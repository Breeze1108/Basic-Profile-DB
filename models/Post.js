const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        image: {type: String, default: "" },
        likes: {type: Number, default: 0},
        caption: {type: String, default: ""},
        username: {type: String, default: ""},
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

const PostModel = mongoose.model('post-model', schema);

module.exports = PostModel;
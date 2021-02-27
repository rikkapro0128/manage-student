const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storys = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, },
    state: { type: String, },
    chapterPresent: { type: Number, },
    updateStory: { type: Date, default: Date.now, },
    listChapter: [{
        chapter: { type: Number, }, 
        picture: [{
            _id: Schema.Types.ObjectId,
            path: { type: String, }
        }],
    }]
})

module.exports = { storys };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const story = new Schema({
    nameStory: { type: String, default: '' },
    nameAuthor: { type: String, default: '' },
    typeStory: { type: String, default: '' },
    categories: [{ type: String, }],
    state: { type: String, enum: ['approve', 'not approve'], default: 'not approve' },
    chapterPresent: { type: Number, default: 0 },
    updateStory: { type: Date, default: new Date },
    listChapter: [{
        chapter: { type: Number, default: 0 }, 
        picture: [{
            path: { type: String, }
        }],
    }]
})

module.exports = { story };

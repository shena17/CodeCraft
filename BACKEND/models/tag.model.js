const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tagSchema = new Schema({
    tagid: { 
        type:String,
    },
    tagname: { 
        type:String,
        unique:true,
    },
    tag: { 
        type:String,
        unique:true,
    
    },
}, {
    timestamps: true,
});



const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
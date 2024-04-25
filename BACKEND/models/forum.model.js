const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const forumSchema = new Schema({
    forumid: { 
        type:String,
    },
    subject: { 
        type:String,
    },
    body: { 
        type:String,
        unique:true,
    },
    tags: { 
        type:String,
        unique:true,
    
    },
}, {
    timestamps: true,
});



const Forum = mongoose.model('Forum', forumSchema);
module.exports = Forum;
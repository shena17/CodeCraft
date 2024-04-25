const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tutorialSchema = new Schema({
    tutorialid: { 
        type:String,
    },
    url: { 
        type:String,
    },
    attach: { 
        type:String,
    },
    
    heading: { 
        type:String,
        unique:true,
    
    },
    tags: { 
        type:String,
    },
}, {
    timestamps: true,
});



const Tutorial = mongoose.model('Tutorial', tutorialSchema);
module.exports = Tutorial;
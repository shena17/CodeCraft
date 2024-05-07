const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const resourceSchema = new Schema({
    resourceid: { 
        type:String,
    },
    type: { 
        type:String,
    },
    attach: { 
        type:String,
    },
    
    heading: { 
        type:String,
        unique:true,
    
    },
}, {
    timestamps: true,
});



const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
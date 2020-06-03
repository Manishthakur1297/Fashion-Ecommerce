const mongoose = require('mongoose')

const websiteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        url: {
            type: String,
            required:true
        }
    },
    { timestamps : true }
)

module.exports = Website = mongoose.model('website', websiteSchema)
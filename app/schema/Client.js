const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phones: [
        {
            _id: false,
            number: {
                type: String,
                require: true,
            }
        }
    ],
    birth: {
        type: Date
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client

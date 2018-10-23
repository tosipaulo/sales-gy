const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
    },
    customerPhone: {
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ['credit', 'cash', 'ticket'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client

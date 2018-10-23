const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
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
    },
    details: {
        installments: {
            type: Number,
            required: true,
            default: 0
        },
        amout: {
            type: Number,
            required: true
        },
        installmentCurrent: {
            type: Number,
            required: true,
            default: 0
        },
        installmentsDate: {
            type: String,
            required: true
        } 
    }
})

const Sale = mongoose.model('Sale', SaleSchema)

module.exports = Sale

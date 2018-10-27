const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
    month: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
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
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    details: {
        installments: {
            type: Number,
            require: true,
            default: 0
        },
        amout: {
            type: Number,
            require: true
        },
        installmentCurrent: {
            type: Number,
            require: true,
            default: 0
        },
        installmentsDate: {
            type: String,
            require: true
        } 
    }
})

const Sale = mongoose.model('Sale', SaleSchema)

module.exports = Sale

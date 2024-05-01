const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user:{
        type: Array,
    default: [],
  }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;

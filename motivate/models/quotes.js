var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema(
    {
        quoteid: { type: Number, unique: true },
        quotetext: { type: String, required: true, unique: true },
        quoteauthor: { type: String },
    }
);

// TODO:
// 0. implement auth scheme for posting new quotes
// 1. validate entries (form validation, auth validation)
// 2. Encrype the form details (password)
// 3. Forgot password / Reset

module.exports = mongoose.model('Quote', quoteSchema);
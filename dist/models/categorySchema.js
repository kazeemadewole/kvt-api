"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        trim: true,
        required: [true, "Ad category must be provided"]
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
});
categorySchema.virtual('userProducts', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});
var Category = mongoose_1.model("Category", categorySchema);
exports.default = Category;

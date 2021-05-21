"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Ad title must be provided"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please describe your Ad"]
    },
    productImage: [String, 'An Image must be added'],
    price: {
        type: Number,
        required: [true, "Please enter the price of your product"],
    },
    contact: {
        type: String,
        required: [true, "Enter a contact number!"]
    },
    location: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'pending'
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    favorite: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }],
    rating: {
        type: Number,
        default: 4.5
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });
var Product = mongoose_1.model("Product", productSchema);
exports.default = Product;

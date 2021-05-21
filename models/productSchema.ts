import mongoose, { Schema, model, connect, Mongoose } from 'mongoose'
import { ProductInterface } from './schemaInterface'

const productSchema = new Schema <ProductInterface>({
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    default: 'pending'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  favorite: [{
    type: mongoose.Schema.Types.ObjectId,
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
}, {timestamps:true});

const Product = model<ProductInterface>("Product", productSchema);
export default Product

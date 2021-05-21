import mongoose,{ Schema, model, connect } from 'mongoose'
import {UserInterface} from './schemaInterface'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import validator from 'validator';

const userSchema = new Schema<UserInterface> (
  {
    firstName: { 
        type: String,
        trim: true, 
        required: [true, 'Can we please know your first name?'] 
    },
    lastName: { 
        type: String, 
        trim: true,
        required: [true, 'What about your surname?'] 
    },
    email: { 
        type: String,
        trim: true,
        unique: [true, 'This email is already registered'],
        required: [true, 'Email must be provided!'],
        validate: [validator.isEmail, 'This is not a valid Email address']     
        },
    password: { 
        type: String, 
        required: [true, 'please enter a password!'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    image: {
        type: String
    },
    phone: { 
        type: String, 
        required: [true, 'Please provide a phone Number'] 
    },
    location: { 
        type: String, 
        required: [true, 'Please provide your location'] 
    }, 
     occupation: {
            type: String,
     },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
    
  },
  { timestamps: true }
);

userSchema.virtual('userProducts', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'createdBy'
})

userSchema.virtual('userProducts', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'favorite'
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


const User = mongoose.model<UserInterface>("User", userSchema);
export default User

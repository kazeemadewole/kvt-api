import { Schema, model, connect } from 'mongoose'
import { CategoryInterface } from './schemaInterface'

const categorySchema = new Schema<CategoryInterface>({
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
})

categorySchema.virtual('userProducts', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

const Category = model<CategoryInterface>("Category", categorySchema);
export default Category

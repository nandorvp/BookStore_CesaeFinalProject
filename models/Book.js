import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        publishingHouse: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: false
        },
        sinopse: {
            type: String,
            required: false
        },
        sinopseAuthor: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        keywords: {
            type: Array,
            required: false
        }
    }
)


export const Book = mongoose.model('Book', bookSchema);
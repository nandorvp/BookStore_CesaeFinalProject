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
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        sinopse: {
            type: String,
            required: true
        },
        sinopseAuthor: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        keywords: {
            type: Array,
            required: true
        }
    }
)


export const Book = mongoose.model('Book', bookSchema);
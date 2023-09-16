import { Schema } from 'mongoose';

export const CarSchema = new Schema (
    {
        make: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)
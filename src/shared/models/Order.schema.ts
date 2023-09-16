import { Schema } from 'mongoose';

export const OrderSchema = new Schema (
    {
        carId: {
            type: Schema.Types.ObjectId,
            ref: 'car',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        sum: {
            type: Number,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
    },
    {
        timestamps: true
    }
)
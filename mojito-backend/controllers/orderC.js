import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            quantity: Number,
            price: Number,
        }
    ],
    user: {
        name: String,
        contact: String,
        address: String,
    },
    totalAmount: Number,
    totalDrinks: Number,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
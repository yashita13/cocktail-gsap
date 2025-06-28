import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

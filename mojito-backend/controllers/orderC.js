import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
    try {
        const { items } = req.body;

        const newOrder = new Order({ items });
        await newOrder.save();

        res.status(200).json({ message: "CartModal placed successfully", order: newOrder });
    } catch (error) {
        console.error("CartModal placement error:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
};

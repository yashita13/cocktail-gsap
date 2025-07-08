import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/place-order", async (req, res) => {
    try {
        const { items, user } = req.body;

        const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const totalDrinks = items.reduce((sum, item) => sum + item.quantity, 0);

        const newOrder = new Order({
            items,
            user,
            totalAmount,
            totalDrinks,
        });

        await newOrder.save();

        res.status(200).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        console.error("Order error:", err);
        res.status(500).json({ error: "Failed to place order" });
    }
});


export default router;
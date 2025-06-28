import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/place-order", async (req, res) => {
    try {
        const { items } = req.body;
        const newOrder = new Order({ items });
        await newOrder.save();
        res.status(200).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: "Failed to place order" });
    }
});

export default router;

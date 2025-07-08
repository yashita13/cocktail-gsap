import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderR.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
    origin: [
        'https://cocktail-gsap-ten.vercel.app',
        'http://localhost:5174' // your React dev server
    ],
    methods: ['GET', 'POST'],
    credentials: false
}));


app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);


connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
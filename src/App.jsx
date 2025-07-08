import React, { useState } from 'react';
import {gsap} from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import axios from "axios";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Cocktails from "./components/Cocktails.jsx";
import About from "./components/About.jsx";
import Art from "./components/Art.jsx";
import Menu from "./components/Menu.jsx";
import Contact from "./components/Contact.jsx";
import CartModal from "./components/CartModal.jsx";
import { cocktailLists, mockTailLists, allCocktails } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    const [quantities, setQuantities] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);

    const totalCount = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);

    const handlePlaceOrder = async (cartItems, user) => {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalDrinks = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        try {
            const response = await axios.post("https://mojito-backend.onrender.com/api/orders/place-order", {
                items: cartItems,
                user,
                totalAmount,
                totalDrinks,
            });

            console.log("✅ Order placed:", response.data);

            // 🔴 THIS LINE IS REQUIRED
            return response;
        } catch (error) {
            console.error("❌ Order error:", error?.response?.data || error.message);
            throw error;
        }
    };



    return (
        <main>
            <Nav onCartClick={() => setIsCartOpen(true)} totalCount={totalCount} />
            <Hero />
            {/*<div className="h-dvh bg-black" />*/}
            <Cocktails quantities={quantities} setQuantities={setQuantities} />
            <About />
            <Art />
            <Menu quantities={quantities} setQuantities={setQuantities} />
            {/*<div className="h-dvh bg-black" />*/}
            <Contact />
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                quantities={quantities}
                allItems={[...cocktailLists, ...mockTailLists, ...allCocktails]}
                onPlaceOrder={handlePlaceOrder}
            />
        </main>
    );
};

export default App;
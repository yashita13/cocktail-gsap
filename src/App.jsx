import React, { useState } from 'react';
import {gsap} from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
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

    const handlePlaceOrder = async (cartItems) => {
        try {
            const res = await fetch("https://mojito-backend.onrender.com/api/orders/place-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cartItems }),
            });

            const data = await res.json();
            console.log("Order placed:", data);
            alert("Order placed successfully!");
            setQuantities({});
            setIsCartOpen(false);
        } catch (err) {
            console.error("Error placing order:", err);
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

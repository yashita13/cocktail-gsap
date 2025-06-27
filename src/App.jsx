import React from 'react';
import {gsap} from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Cocktails from "./components/Cocktails.jsx";
import About from "./components/About.jsx";
import Art from "./components/Art.jsx";
import Menu from "./components/Menu.jsx";
import Contact from "./components/Contact.jsx";
import Order from "./components/Order.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main>
            <Nav />
            <Hero />
            {/*<div className="h-dvh bg-black" />*/}
            <Cocktails />
            <About />
            <Art />
            <Menu />
            {/*<div className="h-dvh bg-black" />*/}
            <Contact />
        </main>
    );
};

export default App;

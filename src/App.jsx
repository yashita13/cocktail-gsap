import React from 'react';
import {gsap} from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Cocktails from "./components/Cocktails.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main>
            <Nav />
            <Hero />
            {/*<div className="h-dvh bg-black" />*/}
            <Cocktails />
        </main>
    );
};

export default App;

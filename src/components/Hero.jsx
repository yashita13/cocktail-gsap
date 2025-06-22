import {useGSAP} from "@gsap/react";

const Hero = () => {
    // useGSAP()

    return (
        <>
        <section id="hero" className="noisy">
            <h1 className="title">
                MOJITO
            </h1>

            <img
                src="/images/hero-left-leaf.png"
                alt="left-leaf"
                className="left-leaf"
            />

            <img
                src="/images/hero-right-leaf.png"
                alt="right-leaf"
                className="right-leaf"
            />

            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Shake. Sip. Savor. </p>
                        <p className="subtitle"> Sip the Spirit <br /> of Summer </p>
                    </div>

                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every cocktail on our menu is crafted with fine spirits, creative flair, and classic balance — meant to stir your soul, not just your glass.
                        </p>
                        <a href="#cocktails">View cocktails</a>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Hero;
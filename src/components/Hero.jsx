import {useGSAP} from "@gsap/react";
import {gsap} from "gsap"
import {SplitText} from "gsap/all";
import {useMediaQuery} from "react-responsive";
import {useRef} from "react";

const Hero = () => {
    const videoRef=useRef();
    const isMobile=useMediaQuery({maxWidth:767})

    useGSAP(()=>{
        const heroSplit=new SplitText('.title', {type:'chars, words'});
        const paraSplit=new SplitText('.subtitle', {type:'lines'});

        heroSplit.chars.forEach((char)=>char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06
        })

        gsap.from(paraSplit.lines,{
            opacity:0,
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06,
            delay:1
        })

        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub:true,
            }
        })
            .to('.right-leaf', {y:200},0)
            .to('.left-leaf', {y:-200},0)

        const startVal=isMobile?'top 50%' : 'center 60%';
        const endVal= isMobile?'120% top' : 'bottom top';

        // Create a timeline for video animation on scroll
        let tl=gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startVal,
                end: endVal,
                scrub: true,
                pin:true,
                // markers: false,
            }
        })
        videoRef.current.onloadedmetadata=()=>{
            tl.to(videoRef.current,{
                currentTime:videoRef.current.duration
            })
        }

    })


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
                            Every cocktail on our menu is meant to stir your soul, not just your glass.
                            <p className="text-yellow"> Visit Store | Order Online</p>
                        </p>
                        <a href="#cocktails">View cocktails</a>
                    </div>
                </div>
            </div>
        </section>

           <div className="video absolute inset-0">
               <video
                   ref={videoRef}
                   src="/videos/output.mp4"
                   muted
                   playsInline
                   preload="auto"
                   // autoPlay
                   // loop
               />
           </div>
        </>
    )
}

export default Hero;

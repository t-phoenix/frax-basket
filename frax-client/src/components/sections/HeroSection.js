import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  HERO_HEADING_DURATION,
  HERO_HEADING_FINAL_OPACITY,
  HERO_HEADING_FINAL_SCALE,
  HERO_HEADING_INITIAL_OPACITY,
  HERO_HEADING_INITIAL_SCALE,
} from "../../constants/animation";
import './hero.css';


export default function HeroSection() {
  const [typingAnimationTextColor, setTypingAnimationTextColor] = useState("");
  const [typingAnimationSize, setTypingAnimationSize] = useState("")    
  return (
    <div
      className="main-animation-div"
    >
      <motion.div
        animate={{
          scale: HERO_HEADING_FINAL_SCALE,
          opacity: HERO_HEADING_FINAL_OPACITY,
        }}
        initial={{
          scale: HERO_HEADING_INITIAL_SCALE,
          opacity: HERO_HEADING_INITIAL_OPACITY,
        }}
        transition={{ ease: "easeInOut", duration: HERO_HEADING_DURATION }}
        className="main-animation-box"
      >
        <h2 className="main-static-text">{`Frax Basket \u00A0`}</h2>
        <h2
          className="main-animation-text"
          style={{ color: typingAnimationTextColor, fontSize: typingAnimationSize }}
        >
          <TypeAnimation
            sequence={[
              () => setTypingAnimationTextColor("#FF9B42"),
              "To Simplify",
              1000,
              ()=>setTypingAnimationTextColor("#C4A287 "),
              "For Investors",
              1000,
              () => setTypingAnimationTextColor("#EF476F"),
              "To Save",
              1000,
              () => setTypingAnimationTextColor("#758173"),
              "For Hodlers",
              1000,
              () => setTypingAnimationTextColor("#3A5743 "),
              "To Diversify",
              1000,
              () => setTypingAnimationTextColor("#D8D8F6 "),
              "For Traders",
              1000,
            ]}
            speed={50}
            deletionSpeed={75}
            repeat={Infinity}
            wrapper="span"
            cursor
            preRenderFirstString={false}
            omitDeletionAnimation={false}
            className="inline-block"
          />
        </h2>
        <p className="main-animation-subtext"> Frax Basket is your gateway to simplified, diversified cryptocurrency investment in Frax Ecosystem tokens. We come to your rescue, offering you a smarter and more accessible way to invest in the exciting world of cryptocurrencies. </p>
      </motion.div>
      
      
    </div>
  );
}

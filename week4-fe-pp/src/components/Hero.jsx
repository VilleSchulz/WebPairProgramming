import "./Hero.css";
import { Link } from "react-router-dom";

import {useLocation} from "react-router-dom";
function Hero() {
  const location = useLocation();
  const heroHeight = location.pathname === "/" ? "hero-home": "hero-other" ;
  
  return (
    <section className= {`hero ${heroHeight}`} id="home">
      <div className="hero-banner">
        <h1>backroads app</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          explicabo debitis est autem dicta.
        </p>
        <Link to="/tours" className="btn hero-btn">
          explore tours</Link>
      </div>
    </section>
  );
}

export default Hero;

import "./Hero.css"
import herohr from "../../assets/herohr.jpg"
import herotech from "../../assets/herotech.png"
import heroperformance from "../../assets/heroperformance.jpg"
import { Link, useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    img: herohr,
    label: 'Practice HR Interviews',
    tag: 'Real Scenarios',
  },
  {
    id: 2,
    img: herotech,
    label: 'Technical Question Rounds',
    tag: 'Coding & Concepts',
  },
  {
    id: 3,
    img: heroperformance,
    label: 'Analyze Performance',
    tag: 'Progress Tracking',
  },
];
function Hero() {

  const navigate = useNavigate();

  const handleGetStarted = () => {

    const token = localStorage.getItem("token");

    if (token) {

      // USER ALREADY LOGGED IN
      navigate("/practice");

    } else {

      // USER NOT LOGGED IN
      navigate("/login");

    }
  };

  return (
    <>
      <section className="hero_home">
        {/* Soft background blobs matching Skilline's warm palette */}
        <div className="hero_home__blob hero_home__blob--1" />
        <div className="hero_home__blob hero_home__blob--2" />
        <div className="hero_home__blob hero_home__blob--3" />

        {/* Left Content */}
        <div className="hero_home__left">
          <div className="hero_home__badge">✨ Practice Smarter. Get Interview Ready.</div>

          <h1 className="hero_home__title">
            Prepare, Practice &<br />
            <span className="hero_home__title--accent">Perform Better in</span><br />
            Every Interview
          </h1>

          <p className="hero_home__subtitle">
            HireSense helps students & job seekers prepare for real interviews through timed mock sessions, curated HR & technical questions, & performance tracking.
          </p>

          <div className="hero_home__actions">
            <button className="hero_home__btn hero_home__btn--primary"  onClick={handleGetStarted}>
              🚀 &nbsp;Get Started
            </button>
            <button className="hero_home__btn hero_home__btn--secondary" >
              <a href="#how-it-works">🎯 How It Works</a>
            </button>
          </div>

          <div className="hero_home__stats">
            <div className="hero_home__stat">
              <span className="hero_home__stat-num">500+</span>
              <span className="hero_home__stat-label">Questions</span>
            </div>
            <div className="hero_home__stat-divider" />
            <div className="hero_home__stat">
              <span className="hero_home__stat-num">HR+</span>
              <span className="hero_home__stat-label">Technical</span>
            </div>
            <div className="hero_home__stat-divider" />
            <div className="hero_home__stat">
              <span className="hero_home__stat-num">95%</span>
              <span className="hero_home__stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="hero_home__right">
          {cards.map((card, index) => (
            <div
              className="hero_home__card"
              key={card.id}
              style={{ '--delay': `${index * 0.18 + 0.1}s` }}
            >
              <img src={card.img} alt={card.label} className="hero_home__card-img" />
              <div className="hero_home__card-overlay">
                <span className="hero_home__card-tag">{card.tag}</span>
                <span className="hero_home__card-label">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Hero;
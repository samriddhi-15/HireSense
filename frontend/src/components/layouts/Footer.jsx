import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const features = ['Mock Interviews', 'HR Interview Practice', 'Technical Rounds', 'Performance Tracking', 'AI Feedback'];
const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Contact', path: '/contact' },
    { name: 'Support', path: '/support' }
];

const socials = [
    { label: 'TW', href: '#', icon: '𝕏' },
    { label: 'LI', href: '#', icon: 'in' },
    { label: 'YT', href: '#', icon: '▶' },
];

function Footer() {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) { setSubmitted(true); }
    };

    return (
        <footer className={`footer ${visible ? 'footer--visible' : ''}`} ref={ref}>

            {/* Blobs */}
            <div className="footer__blob footer__blob--1" />
            <div className="footer__blob footer__blob--2" />
            <div className="footer__noise" />

            {/* Top divider glow line */}
            <div className="footer__topline" />

            {/* Main grid */}
            <div className="footer__grid">

                {/* Col 1 — Brand */}
                <div className="footer__col footer__col--brand" style={{ '--ci': 0 }}>
                    <div className="footer__logo">
                        <span className="footer__logo-icon">◆</span>
                        <span className="footer__logo-text">HireSense.</span>
                    </div>
                    <p className="footer__tagline">
                        Empowering students with realistic mock interviews, smart feedback, and placement-focused preparation.
                    </p>
                    <div className="footer__socials">
                        {socials.map((s) => (
                            <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Col 2 — Features */}
                <div className="footer__col" style={{ '--ci': 1 }}>
                    <h4 className="footer__col-heading">Features</h4>
                    <ul className="footer__links">
                        {features.map((item, i) => (
                            <li key={i} style={{ '--li': i }}>
                                <a href="#" className="footer__link">
                                    <span className="footer__link-arrow">›</span>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3 — Company */}
                <div className="footer__col" style={{ '--ci': 2 }}>
                    <h4 className="footer__col-heading">Company</h4>

                    <ul className="footer__links">
                        {company.map((item, i) => (
                            <li key={i} style={{ '--li': i }}>
                                <Link to={item.path} className="footer__link">
                                    <span className="footer__link-arrow">›</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4 — Newsletter */}
                <div className="footer__col footer__col--news" style={{ '--ci': 3 }}>
                    <h4 className="footer__col-heading">Interview Tips & Updates</h4>
                    <p className="footer__news-sub">
                        Get interview preparation tips, mock interview updates, and career guidance directly in your inbox.
                    </p>

                    {submitted ? (
                        <div className="footer__success">
                            <span className="footer__success-icon">✓</span>
                            You're on the list!
                        </div>
                    ) : (
                        <form className="footer__form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="footer__input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="footer__submit">
                                <Link to={'/login'}>Join HireSense.</Link>
                            </button>
                        </form>
                    )}

                    <p className="footer__news-note">No spam, ever. Unsubscribe anytime.</p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <p className="footer__copy">© 2025 HireSense. All rights reserved.</p>
                <div className="footer__legal">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                        <a key={i} href="#" className="footer__legal-link">{item}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
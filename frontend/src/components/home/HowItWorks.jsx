import React, { useEffect, useRef, useState } from 'react';
import './HowItWorks.css';

const steps = [
    {
        id: '01',
        icon: '🎓',
        title: 'Create Your Account',
        desc: 'Sign up and set up your HireSense profile to begin practicing mock interviews.',
        color: '#f5a623',
    },
    {
        id: '02',
        icon: '🗂️',
        title: 'Choose Interview Type',
        desc: 'Select HR or technical interview rounds based on your preparation goals.',
        color: '#4a9fd5',
    },
    {
        id: '03',
        icon: '🚀',
        title: 'Start Learning',
        desc: 'Answer interview questions within a timed environment to simulate real interview pressure.',
        color: '#f5a623',
    },
    {
        id: '04',
        icon: '🏆',
        title: 'Track Performance',
        desc: 'View scores, analyze responses, and improve your interview skills with detailed feedback.',
        color: '#4a9fd5',
    },
];


function HowItWorks() {

    const [visible, setVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Auto-cycle active step
    useEffect(() => {
        if (!visible) return;
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % steps.length);
        }, 2200);
        return () => clearInterval(interval);
    }, [visible]);


    return (
        <>
            <section id='how-it-works' className={`hiw ${visible ? 'hiw--visible' : ''}`} ref={sectionRef}>
                {/* blobs */}
                <div className="hiw__blob hiw__blob--1" />
                <div className="hiw__blob hiw__blob--2" />

                {/* Header */}
                <div className="hiw__header">
                    <span className="hiw__eyebrow">✦ Simple Process</span>
                    <h2 className="hiw__heading">How It <span className="hiw__heading-accent">Works</span></h2>
                    <p className="hiw__subtext">
                        Four simple steps to transform the way you learn — no fluff, just results.
                    </p>
                </div>

                {/* Steps */}
                <div className="hiw__steps">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={`hiw__step ${activeStep === i ? 'hiw__step--active' : ''}`}
                                style={{ '--i': i, '--accent': step.color }}
                                onMouseEnter={() => setActiveStep(i)}
                            >
                                {/* Number badge */}
                                <div className="hiw__step-num">{step.id}</div>

                                {/* Icon circle */}
                                <div className="hiw__step-icon-wrap">
                                    <div className="hiw__step-ring" />
                                    <div className="hiw__step-icon">{step.icon}</div>
                                </div>

                                <h3 className="hiw__step-title">{step.title}</h3>
                                <p className="hiw__step-desc">{step.desc}</p>

                                {/* Progress bar */}
                                <div className="hiw__step-bar">
                                    <div className="hiw__step-bar-fill" />
                                </div>
                            </div>

                            {/* Connector Arrow between steps */}
                            {i < steps.length - 1 && (
                                <div className={`hiw__connector ${activeStep > i ? 'hiw__connector--done' : ''}`}>
                                    <div className="hiw__connector-line" />
                                    <div className="hiw__connector-arrow">›</div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="hiw__dots">
                    {steps.map((_, i) => (
                        <button
                            key={i}
                            className={`hiw__dot ${activeStep === i ? 'hiw__dot--active' : ''}`}
                            onClick={() => setActiveStep(i)}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="hiw__cta">
                    <button className="hiw__cta-btn">Get Started </button>
                </div>
            </section>

        </>
    )
}

export default HowItWorks;
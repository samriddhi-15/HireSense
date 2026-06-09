import axios from "axios";
import React, { useState, useEffect } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';


const FloatingShape = ({ style, className }) => (
    <div className={`signup__shape ${className}`} style={style} />
);


function Signup() {

    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState({
        firstName: '', lastName: '', phone: '', email: '',
        password: '', confirmPassword: '',
        newsletter: false, terms: false,
    });
    const [focusedField, setFocusedField] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.password !== form.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const dataStore = await axios.post(`${import.meta.env.VITE_API_URL}/hireSense/signUp`,
                {
                    fname: form.firstName,
                    lname: form.lastName,
                    phone: form.phone,
                    email: form.email,
                    password: form.password
                }
            );
            console.log(dataStore, "response");

            if (dataStore.data.status === 400) {
                alert(dataStore.data.message);
            } else {
                alert(dataStore.data.message);
                setSubmitted(true);
            }
        } catch (error) {
            console.log("ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("REQUEST:", error.request);
            alert(error.message);
        }
    };


    return (
        <>
            <div className="signup__page">
                {/* Outer page background */}
                <div className="signup__page-bg">
                    <div className="signup__page-blob signup__page-blob--1" />
                    <div className="signup__page-blob signup__page-blob--2" />
                    <div className="signup__page-blob signup__page-blob--3" />
                    <div className="signup__page-noise" />
                </div>

                {/* Centered card */}
                <div className={`signup__card ${mounted ? 'signup__card--in' : ''}`}>

                    {/* ── Left Panel ── */}
                    <div className="signup__left">
                        {/* Blobs inside left panel */}
                        <div className="signup__left-blob signup__left-blob--1" />
                        <div className="signup__left-blob signup__left-blob--2" />

                        {/* Logo */}
                        <div className="signup__left-logo">
                            <span className="signup__left-logo-icon">◆</span>
                            <span className="signup__left-logo-text"><Link to="/">HireSense.</Link></span>
                        </div>

                        {/* Headline */}
                        <div className="signup__left-text">
                            <h1 className="signup__left-title">Learning<br />Academy</h1>
                            <p className="signup__left-desc">
                                Unlock your potential with expert-led courses, live quizzes, and a community that grows with you.
                            </p>
                        </div>

                        {/* Illustration — pure CSS 3D learning scene */}
                        <div className="signup__illustration">

                            {/* Floating shapes behind */}
                            <FloatingShape className="signup__shape--circle-lg" style={{}} />
                            <FloatingShape className="signup__shape--circle-sm" style={{}} />
                            <FloatingShape className="signup__shape--diamond" style={{}} />

                            {/* Person reading */}
                            <div className="signup__person">
                                <div className="signup__person-body">
                                    <div className="signup__person-head">
                                        <div className="signup__person-hair" />
                                        <div className="signup__person-face" />
                                    </div>
                                    <div className="signup__person-torso" />
                                    <div className="signup__person-arm signup__person-arm--left" />
                                    <div className="signup__person-arm signup__person-arm--right" />
                                    <div className="signup__person-book">
                                        <div className="signup__person-book-page" />
                                    </div>
                                    <div className="signup__person-legs">
                                        <div className="signup__person-leg signup__person-leg--left" />
                                        <div className="signup__person-leg signup__person-leg--right" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating cards/badges */}
                            <div className="signup__badge signup__badge--1">
                                <span>🎓</span> 340+ Courses
                            </div>
                            <div className="signup__badge signup__badge--2">
                                <span>⚡</span> Live Sessions
                            </div>
                            <div className="signup__badge signup__badge--3">
                                <span>🏆</span> Certified
                            </div>
                        </div>

                        {/* Bottom social hint */}
                        <p className="signup__left-social">Join us on Instagram · YouTube · LinkedIn</p>
                    </div>

                    {/* ── Right Panel ── */}
                    <div className="signup__right">

                        {submitted ? (
                            <div className="signup__success">
                                <div className="signup__success-icon">✓</div>
                                <h2 className="signup__success-title">Welcome aboard!</h2>
                                <p className="signup__success-sub">Your HireSense account is ready. Start learning today.</p>
                                <button className="signup__success-btn" onClick={() => navigate("/")
                                }>
                                    Go to Home →
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="signup__right-header">
                                    <h2 className="signup__right-title">Welcome to HireSense.</h2>
                                    <p className="signup__right-sub">Let's help you get started.</p>
                                    <p className="signup__right-login">
                                        Already have an account? <Link to={'/login'} className="signup__right-loginlink">Log in</Link>
                                    </p>
                                </div>

                                <form className="signup__form" onSubmit={handleSubmit}>
                                    {/* Row 1 */}
                                    <div className="signup__row">
                                        <div className={`signup__field ${focusedField === 'firstName' ? 'signup__field--focus' : ''} ${form.firstName ? 'signup__field--filled' : ''}`}>
                                            <label className="signup__label">First Name</label>
                                            <input
                                                className="signup__input"
                                                name="firstName" type="text"
                                                value={form.firstName} onChange={handleChange}
                                                onFocus={() => setFocusedField('fname')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                            />
                                            <div className="signup__field-bar" />
                                        </div>
                                        <div className={`signup__field ${focusedField === 'lastName' ? 'signup__field--focus' : ''} ${form.lastName ? 'signup__field--filled' : ''}`}>
                                            <label className="signup__label">Last Name</label>
                                            <input
                                                className="signup__input"
                                                name="lastName" type="text"
                                                value={form.lastName} onChange={handleChange}
                                                onFocus={() => setFocusedField('lname')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                            />
                                            <div className="signup__field-bar" />
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="signup__row">
                                        <div className={`signup__field ${focusedField === 'phone' ? 'signup__field--focus' : ''} ${form.phone ? 'signup__field--filled' : ''}`}>
                                            <label className="signup__label">Phone</label>
                                            <input
                                                className="signup__input"
                                                name="phone" type="tel"
                                                value={form.phone} onChange={handleChange}
                                                onFocus={() => setFocusedField('phone')}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                            <div className="signup__field-bar" />
                                        </div>
                                        <div className={`signup__field ${focusedField === 'email' ? 'signup__field--focus' : ''} ${form.email ? 'signup__field--filled' : ''}`}>
                                            <label className="signup__label">Email</label>
                                            <input
                                                className="signup__input"
                                                name="email" type="email"
                                                value={form.email} onChange={handleChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                            />
                                            <div className="signup__field-bar" />
                                        </div>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="signup__row">
                                        <div className={`signup__field ${focusedField === 'password' ? 'signup__field--focus' : ''} ${form.password ? 'signup__field--filled' : ''}`}>
                                            <label className="signup__label">Password</label>
                                            <input
                                                className="signup__input"
                                                name="password" type={showPass ? 'text' : 'password'}
                                                value={form.password} onChange={handleChange}
                                                onFocus={() => setFocusedField('password')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                            />
                                            <button type="button" className="signup__eye" onClick={() => setShowPass(p => !p)}>
                                                {showPass ? '🙈' : '👁'}
                                            </button>
                                            <div className="signup__field-bar" />
                                        </div>
                                        <div className={`signup__field ${focusedField === 'confirmPassword' ? 'signup__field--focus' : ''} ${form.confirmPassword ? 'signup__field--filled' : ''}`}>
                                            <label className="signup__label">Confirm Password</label>
                                            <input
                                                className="signup__input"
                                                name="confirmPassword" type={showPass ? 'text' : 'password'}
                                                value={form.confirmPassword} onChange={handleChange}
                                                onFocus={() => setFocusedField('confirmPassword')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                            />
                                            <div className="signup__field-bar" />
                                        </div>
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="signup__checks">
                                        <label className="signup__check">
                                            <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} />
                                            <span className="signup__check-box" />
                                            <span className="signup__check-label">I want to receive latest news and course updates from HireSense.</span>
                                        </label>
                                        <label className="signup__check">
                                            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} required />
                                            <span className="signup__check-box" />
                                            <span className="signup__check-label">
                                                I agree to the <a href="#" className="signup__right-loginlink">Terms &amp; Privacy Policy</a>.
                                            </span>
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <button type="submit" className="signup__submit" disabled={!form.terms}>
                                        <span>Sign Up</span>
                                        <span className="signup__submit-arrow">→</span>
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
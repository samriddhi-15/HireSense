import axios from "axios";
import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const FloatingShape = ({ style, className }) => (
  <div className={`lp__shape ${className}`} style={style} />
);


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setShake(true);
        setTimeout(() => setShake(false), 600);
        return;
      }

      const dataStore = await axios.post(`${import.meta.env.VITE_API_URL}/hireSense/logIn`,
        {
          email, password
        }
      );

      console.log(dataStore, "response");
      if (dataStore.data.status === 400) {
        alert(dataStore.data.message);

      } else {

        // SAVE JWT TOKEN
        localStorage.setItem(
          "token",
          dataStore.data.token
        );

        // SAVE USER DATA
        localStorage.setItem(
          "user",
          JSON.stringify(dataStore.data.body)
        );

        alert(dataStore.data.message);

        setSubmitted(true);

        setTimeout(() => {

          // REDIRECT TO PRACTICE PAGE
          navigate("/practice");

        }, 1500);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="lp__page">

        {/* Page-level background */}
        <div className="lp__page-bg" />
        <div className="lp__page-blob lp__page-blob--1" />
        <div className="lp__page-blob lp__page-blob--2" />
        <div className="lp__page-noise" />

        {/* Centered card */}
        <div className={`lp__card ${loaded ? 'lp__card--in' : ''} ${shake ? 'lp__card--shake' : ''}`}>

          {/* ── Left panel ── */}
          <div className="lp__left">

            {/* Noise overlay */}
            <div className="lp__left-noise" />

            {/* Blobs inside left panel */}
            <div className="lp__left-blob lp__left-blob--1" />
            <div className="lp__left-blob lp__left-blob--2" />
            <div className="lp__left-blob lp__left-blob--3" />

            {/* Logo */}
            <div className={`lp__logo ${loaded ? 'lp__logo--in' : ''}`}>
              <span className="lp__logo-icon">◆</span>
              <span className="lp__logo-text"><Link to="/">HireSense.</Link></span>
            </div>

            {/* Illustration — SVG learning scene */}
            <div className={`lp__illustration ${loaded ? 'lp__illustration--in' : ''}`}>
              <svg viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="lp__svg">

                {/* Ground */}
                <ellipse cx="170" cy="272" rx="130" ry="14" fill="rgba(0,0,0,0.15)" />

                {/* Tree trunk */}
                <rect x="196" y="180" width="18" height="80" rx="9" fill="#8B5E3C" />
                {/* Tree canopy */}
                <circle cx="205" cy="155" r="55" fill="#4a9fd5" opacity="0.85" />
                <circle cx="225" cy="145" r="38" fill="#3a8fc5" opacity="0.7" />
                <circle cx="188" cy="162" r="30" fill="#5aaee5" opacity="0.6" />

                {/* Book stack */}
                <rect x="60" y="230" width="60" height="10" rx="4" fill="#f5a623" />
                <rect x="64" y="222" width="52" height="10" rx="4" fill="#e8920f" />
                <rect x="68" y="214" width="44" height="10" rx="4" fill="#fcd29f" />

                {/* Person sitting - body */}
                <ellipse cx="130" cy="240" rx="26" ry="12" fill="#2e2318" opacity="0.3" />
                {/* legs */}
                <path d="M115 235 Q105 255 90 258" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
                <path d="M145 235 Q158 255 168 252" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
                {/* torso */}
                <rect x="114" y="200" width="32" height="40" rx="12" fill="#f5a623" />
                {/* backpack */}
                <rect x="146" y="204" width="18" height="26" rx="8" fill="#e8920f" />
                <rect x="150" y="210" width="10" height="14" rx="4" fill="#fcd29f" />
                {/* head */}
                <circle cx="130" cy="192" r="18" fill="#fde8c8" />
                {/* hair */}
                <path d="M112 188 Q115 170 130 170 Q145 170 148 188" fill="#2e2318" />
                {/* reading book */}
                <rect x="108" y="208" width="28" height="20" rx="4" fill="white" transform="rotate(-15 108 208)" />
                <line x1="122" y1="208" x2="120" y2="226" stroke="#ddd" strokeWidth="1.5" transform="rotate(-15 122 208)" />

                {/* Floating birds */}
                <path d="M72 140 Q78 134 84 140 Q90 134 96 140" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" fill="none" className="lp__bird lp__bird--1" />
                <path d="M250 110 Q254 105 258 110 Q262 105 266 110" stroke="#4a9fd5" strokeWidth="2" strokeLinecap="round" fill="none" className="lp__bird lp__bird--2" />
                <path d="M40 170 Q44 166 48 170 Q52 166 56 170" stroke="rgba(245,237,224,0.5)" strokeWidth="2" strokeLinecap="round" fill="none" className="lp__bird lp__bird--3" />

                {/* Stars / sparkles */}
                <text x="56" y="120" fontSize="14" fill="#f5a623" className="lp__sparkle lp__sparkle--1">✦</text>
                <text x="268" y="160" fontSize="10" fill="rgba(245,237,224,0.6)" className="lp__sparkle lp__sparkle--2">✦</text>
                <text x="90" y="95" fontSize="8" fill="#4a9fd5" className="lp__sparkle lp__sparkle--3">✦</text>
              </svg>
            </div>

            {/* Left tagline */}
            <div className={`lp__left-text ${loaded ? 'lp__left-text--in' : ''}`}>
              <h2 className="lp__left-heading">Welcome Back.</h2>
              <p className="lp__left-sub">Your learning journey continues right here.</p>
            </div>

            {/* Social hint */}
            <p className={`lp__social-hint ${loaded ? 'lp__social-hint--in' : ''}`}>
              Instagram · Twitter · LinkedIn
            </p>
          </div>

          {/* ── Right panel ── */}
          <div className="lp__right">

            {submitted ? (
              /* ── Success state ── */
              <div className="lp__success">
                <div className="lp__success-ring" />
                <div className="lp__success-icon">✓</div>
                <h3 className="lp__success-title">You're in!</h3>
                <p className="lp__success-sub">Welcome back to HireSense. Redirecting you now…</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className={`lp__form-header ${loaded ? 'lp__form-header--in' : ''}`}>
                  <h2 className="lp__form-title">Welcome to HireSense.</h2>
                  <p className="lp__form-sub">Sign in to continue your prep journey.</p>
                  <p className="lp__form-alt">
                    Don't have an account? <Link to={'/signup'} className="lp__form-link">Sign up</Link>
                  </p>
                </div>

                {/* Form */}
                <form className="lp__form" onSubmit={handleSubmit} noValidate>

                  {/* Email */}
                  <div
                    className={`lp__field ${loaded ? 'lp__field--in' : ''} ${focused === 'email' ? 'lp__field--focused' : ''} ${email ? 'lp__field--filled' : ''}`}
                    style={{ '--fi': 0 }}
                  >
                    <label className="lp__label">Email Address</label>
                    <div className="lp__input-wrap">
                      <span className="lp__input-icon">✉</span>
                      <input
                        type="email"
                        className="lp__input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className="lp__field-bar" />
                  </div>

                  {/* Password */}
                  <div
                    className={`lp__field ${loaded ? 'lp__field--in' : ''} ${focused === 'pass' ? 'lp__field--focused' : ''} ${password ? 'lp__field--filled' : ''}`}
                    style={{ '--fi': 1 }}
                  >
                    <label className="lp__label">Password</label>
                    <div className="lp__input-wrap">
                      <span className="lp__input-icon">🔒</span>
                      <input
                        type={showPass ? 'text' : 'password'}
                        className="lp__input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={() => setFocused('pass')}
                        onBlur={() => setFocused(null)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="lp__eye"
                        onClick={() => setShowPass(p => !p)}
                        tabIndex={-1}
                      >
                        {showPass ? '🙈' : '👁'}
                      </button>
                    </div>
                    <div className="lp__field-bar" />
                  </div>

                  {/* Forgot */}
                  <div className={`lp__forgot-row ${loaded ? 'lp__forgot-row--in' : ''}`}>
                    <Link to="/forgotPassword" className="lp__forgot">Forgot password?</Link>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`lp__submit ${loaded ? 'lp__submit--in' : ''}`}
                  >
                    <span className="lp__submit-text">Log In</span>
                    <span className="lp__submit-arrow">→</span>
                  </button>

                  {/* Divider */}
                  <div className={`lp__divider ${loaded ? 'lp__divider--in' : ''}`}>
                    <span />
                    <p>or continue with</p>
                    <span />
                  </div>

                  {/* OAuth */}
                  <div className={`lp__oauth ${loaded ? 'lp__oauth--in' : ''}`}>
                    {['G  Google', '⬛ GitHub', 'in  LinkedIn'].map((p, i) => (
                      <button key={i} type="button" className="lp__oauth-btn">
                        {p}
                      </button>
                    ))}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
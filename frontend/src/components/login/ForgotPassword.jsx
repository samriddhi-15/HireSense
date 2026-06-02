import axios from "axios";
import { useState, useCallback } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   Utility: validate email format
───────────────────────────────────────────── */
const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/* ─────────────────────────────────────────────
   Sub-component: FloatingInput
───────────────────────────────────────────── */
function FloatingInput({ label, icon, type = "text", value, onChange, placeholder, status, message }) {
    return (
        <div className="fp-field">
            <span className="fp-field-label">{label}</span>
            <div className={`fp-field-inner ${status || ""}`}>
                <span className="fp-field-icon">{icon}</span>
                <input
                    className="fp-input"
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="email"
                    aria-label={label}
                />
                {status === "success" && <span style={{ color: "#3dba7c", marginLeft: 8 }}>✓</span>}
            </div>
            {message && <p className={`fp-field-msg ${status}`}>{message}</p>}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sub-component: AuthButton
───────────────────────────────────────────── */
function AuthButton({ onClick, disabled, loading, children }) {
    return (
        <button
            className="fp-btn-primary"
            onClick={onClick}
            disabled={disabled || loading}
            type="button"
        >
            {loading ? <span className="fp-spinner" /> : children}
        </button>
    );
}

/* ─────────────────────────────────────────────
   Sub-component: SuccessAnimation
───────────────────────────────────────────── */
function SuccessAnimation({ email }) {
    return (
        <div className="fp-success">
            <div className="fp-success-icon">📨</div>
            <h2 className="fp-success-title">Reset Link Sent!</h2>
            <p className="fp-success-sub">
                A secure password reset link has been dispatched to <span className="fp-success-email">{email}</span>. Check your inbox — it expires in 15 minutes.
            </p>
            <p style={{ fontSize: "0.75rem", color: "#9a8a7a", marginTop: 14 }}>
                Didn't receive it? Check spam or try again in 60 seconds.
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main: ForgotPassword
───────────────────────────────────────────── */
export default function ForgotPassword({ onNavigateToLogin }) {
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState(""); // "" | "error" | "success"
    const [emailMsg, setEmailMsg] = useState("");
    const [loadingLink, setLoadingLink] = useState(false);
    const [sent, setSent] = useState(false);

    /* Validate on change */
    const handleEmailChange = useCallback((e) => {
        const val = e.target.value;
        setEmail(val);
        if (!val) { setEmailStatus(""); setEmailMsg(""); return; }
        if (isValidEmail(val)) {
            setEmailStatus("success");
            setEmailMsg("Looks good!");
        } else {
            setEmailStatus("error");
            setEmailMsg("Please enter a valid email address.");
        }
    }, []);

    /* ── API Flow: Send Reset Link ── */
    const handleSendLink = async () => {
        if (!isValidEmail(email)) {
            setEmailStatus("error");
            setEmailMsg("A valid email is required to send the reset link.");
            return;
        }
        setLoadingLink(true);
        try {
            const response = await axios.post(
                "http://localhost:4000/hireSense/forgotPassword",
                { email }
            );

            console.log(response.data);

            if (response.data.success) {
                setSent(true);
            } else {
                alert(response.data.message);
            }
        } catch {
            setEmailStatus("error");
            setEmailMsg("Failed to send reset link. Please try again.");
        } finally {
            setLoadingLink(false);
        }
    };

    const isEmailValid = isValidEmail(email);

    return (
        <div className="fp-page">
            {/* Background blobs */}
            <div className="fp-blob fp-blob-1" />
            <div className="fp-blob fp-blob-2" />
            <div className="fp-blob fp-blob-3" />

            <div className="fp-card">
                {/* ── LEFT PANEL ── */}
                <div className="fp-left">
                    {/* Logo */}
                    <div className="fp-logo">
                        <div className="fp-logo-diamond" />
                        <Link to="/">HireSense.</Link>
                    </div>

                    /* Illustration */
                    <div className="fp-illustration">
                        <div className="fp-shield-wrap">
                            <div className="fp-ring fp-ring-3" />
                            <div className="fp-ring fp-ring-2" />
                            <div className="fp-ring fp-ring-1" />
                            <svg className="fp-shield-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32 4L8 14v18c0 13.25 10.4 25.64 24 29 13.6-3.36 24-15.75 24-29V14L32 4z"
                                    fill="rgba(240,165,0,0.15)"
                                    stroke="#f0a500"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M24 32l6 6 10-10"
                                    stroke="#f0a500"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="32" cy="26" r="3" fill="#f0a500" opacity="0.7" />
                            </svg>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <h2 className="fp-left-title">Secure Account<br />Recovery</h2>
                            <p className="fp-left-sub">We'll verify your identity<br />and get you back on track.</p>
                        </div>
                    </div>

                    {/* Security Badges updated to remove OTP item */}
                    <div className="fp-badges">
                        <div className="fp-badge">
                            <span className="fp-badge-icon">🔐</span>
                            Secure Authentication
                        </div>
                        <div className="fp-badge">
                            <span className="fp-badge-icon">🛡️</span>
                            End-to-End Protected
                        </div>
                    </div>

                    {/* Social links */}
                    <div className="fp-social">
                        <a href="#" tabIndex={-1}>Instagram</a>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <a href="#" tabIndex={-1}>Twitter</a>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <a href="#" tabIndex={-1}>LinkedIn</a>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="fp-right">
                    {sent ? (
                        <>
                            <SuccessAnimation email={email} />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button className="fp-back" onClick={onNavigateToLogin}>
                                    <Link to="/login">← Back to Login</Link>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="fp-heading">Forgot Password?</h1>
                            <p className="fp-sub">
                                No worries! Enter your registered email and we'll help you get back in.{" "}
                                <span className="fp-amber" onClick={onNavigateToLogin}>
                                    <Link to="/login">← Back to Login</Link>
                                </span>
                            </p>

                            {/* Email Input */}
                            <FloatingInput
                                label="Email Address"
                                icon="✉"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="you@example.com"
                                status={emailStatus}
                                message={emailMsg}
                            />

                            {/* Helper text */}
                            <div className="fp-helper">
                                <span className="fp-helper-icon">ℹ</span>
                                We'll send a secure password reset link straight to your registered email inbox.
                            </div>

                            {/* Action button */}
                            <div className="fp-actions">
                                <AuthButton
                                    loading={loadingLink}
                                    disabled={!isEmailValid}
                                    onClick={handleSendLink}
                                >
                                    📨 Send Reset Link →
                                </AuthButton>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                                <button className="fp-back" onClick={onNavigateToLogin}>
                                    <Link to="/login">← Back to Login</Link>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
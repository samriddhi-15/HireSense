import axios from "axios";
import { useState, useEffect } from "react";
import "./ResetPassword.css";
import { Link, useParams, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   PasswordStrength component
───────────────────────────────────────────── */
function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
}

const STRENGTH_MAP = [
    { label: "Too Weak", color: "#e05252", width: "15%" },
    { label: "Weak", color: "#f59e0b", width: "35%" },
    { label: "Fair", color: "#ecc94b", width: "60%" },
    { label: "Strong", color: "#48bb78", width: "80%" },
    { label: "Very Strong", color: "#38a169", width: "100%" },
];

function PasswordStrength({ password }) {
    if (!password) return null;
    const score = getStrength(password);
    const { label, color, width } = STRENGTH_MAP[score];
    return (
        <div className="pw-strength">
            <div className="pw-strength-bar-wrap">
                <div className="pw-strength-bar" style={{ width, background: color }} />
            </div>
            <span className="pw-strength-label" style={{ color }}>Strength: {label}</span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   PasswordRequirements component
───────────────────────────────────────────── */
const REQS = [
    { id: "len", label: "8+ characters", test: (p) => p.length >= 8 },
    { id: "upper", label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { id: "num", label: "Number", test: (p) => /[0-9]/.test(p) },
    { id: "spec", label: "Special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];


function PasswordRequirements({ password }) {
    if (!password) return null;
    return (
        <div className="pw-reqs">
            {REQS.map(({ id, label, test }) => {
                const met = test(password);
                return (
                    <div key={id} className={`pw-req ${met ? "met" : ""}`}>
                        <span className="pw-req-dot">{met ? "✓" : ""}</span>
                        {label}
                    </div>
                );
            })}
        </div>
    );
}

/* ─────────────────────────────────────────────
   SuccessAnimation component
───────────────────────────────────────────── */
function SuccessAnimation() {

    const navigate = useNavigate();

    useEffect(() => {

        const t = setTimeout(() => {
            navigate("/login");
        }, 3200);

        return () => clearTimeout(t);

    }, [navigate]);

    return (
        <div className="rp-success">
            <div className="rp-success-icon">🔓</div>
            <h2 className="rp-success-title">Password Reset Successful</h2>
            <p className="rp-success-sub">
                Your password has been updated securely.<br />You can now log in with your new credentials.
            </p>
            <div className="rp-redirect-bar-wrap">
                <div className="rp-redirect-bar" />
            </div>
            <p className="rp-redirect-label">Redirecting to Login…</p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main: ResetPassword
───────────────────────────────────────────── */
export default function ResetPassword({ onNavigateToLogin }) {
    const { token } = useParams();
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    /* Derived state */
    const allReqsMet = REQS.every(({ test }) => test(newPw));
    const pwMatch = newPw && confirmPw && newPw === confirmPw;
    const canSubmit = allReqsMet && pwMatch;

    /* Step tracker */
    const pwDone = allReqsMet && pwMatch;

    /* ── API Placeholder ── */
    const handleSubmit = async () => {
        if (!canSubmit) return;
        setLoading(true);
        setErrorMsg("");
        try {
            // TODO: Extract token from URL using URLSearchParams or useParams() from react-router-dom
            // await axios.post('/api/auth/reset-password', {
            //   token, 
            //   newPassword: newPw,
            // });

            const response = await axios.put(
                `http://localhost:4000/hireSense/resetPassword/${token}`,
                {
                    password: newPw,
                    confirmPassword: confirmPw
                }
            );
            console.log(response.data);

            if (response.data.success) {
                setSuccess(true);
            } else {
                setErrorMsg(response.data.message);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message ||
                "Reset link is invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    /* Confirm match status */
    const confirmStatus =
        !confirmPw ? "" :
            confirmPw && newPw === confirmPw ? "success" : "error";

    return (
        <div className="rp-page">
            <div className="rp-blob rp-blob-1" />
            <div className="rp-blob rp-blob-2" />
            <div className="rp-blob rp-blob-3" />

            <div className="rp-card">
                {/* ── LEFT PANEL ── */}
                <div className="rp-left">
                    <div className="rp-logo">
                        <div className="rp-logo-diamond" />
                        HireSense.
                    </div>

                    <div className="rp-illustration">
                        <div className="rp-lock-wrap">
                            <div className="rp-lock-ring rp-lock-ring-3" />
                            <div className="rp-lock-ring rp-lock-ring-2" />
                            <div className="rp-lock-ring rp-lock-ring-1" />
                            <svg className="rp-lock-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12" y="28" width="40" height="26" rx="6" fill="rgba(240,165,0,0.15)" stroke="#f0a500" strokeWidth="2" />
                                <path d="M20 28v-8a12 12 0 0124 0v8" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="32" cy="40" r="4" fill="#f0a500" opacity="0.8" />
                                <rect x="30" y="42" width="4" height="6" rx="1" fill="#f0a500" opacity="0.8" />
                            </svg>
                        </div>

                        <h2 className="rp-left-title">Create New<br />Password</h2>
                        <p className="rp-left-sub">Verify your identity and<br />secure your account.</p>
                    </div>

                    {/* Steps updated to reflect token flow */}
                    <div className="rp-steps">
                        <div className={`rp-step ${pwDone ? "done" : "active"}`}>
                            <div className="rp-step-dot">{pwDone ? "✓" : "1"}</div>
                            Set Password
                        </div>
                        <div className={`rp-step ${success ? "done" : pwDone ? "active" : ""}`}>
                            <div className="rp-step-dot">{success ? "✓" : "2"}</div>
                            All Done!
                        </div>
                    </div>

                    <div className="rp-social">
                        <a href="#" tabIndex={-1}>Instagram</a>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <a href="#" tabIndex={-1}>Twitter</a>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <a href="#" tabIndex={-1}>LinkedIn</a>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="rp-right">
                    {success ? (
                        <SuccessAnimation/>
                    ) : (
                        <>
                            <h1 className="rp-heading">Reset Password</h1>
                            <p className="rp-sub">
                                Please choose a secure password that you haven't used before.
                            </p>

                            {/* New Password */}
                            <div className="rp-field">
                                <span className="rp-field-label">New Password</span>
                                <div className={`rp-field-inner ${newPw && !allReqsMet ? "error" : newPw && allReqsMet ? "success" : ""}`}>
                                    <span className="rp-field-icon">🔑</span>
                                    <input
                                        className="rp-input"
                                        type={showNew ? "text" : "password"}
                                        value={newPw}
                                        onChange={(e) => { setNewPw(e.target.value); setErrorMsg(""); }}
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
                                    />
                                    <button className="rp-toggle" onClick={() => setShowNew((s) => !s)} type="button" tabIndex={-1}>
                                        {showNew ? "🙈" : "👁"}
                                    </button>
                                </div>
                            </div>

                            <PasswordStrength password={newPw} />
                            <PasswordRequirements password={newPw} />

                            {/* Confirm Password */}
                            <div className="rp-field">
                                <span className="rp-field-label">Confirm Password</span>
                                <div className={`rp-field-inner ${confirmStatus}`}>
                                    <span className="rp-field-icon">🔒</span>
                                    <input
                                        className="rp-input"
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPw}
                                        onChange={(e) => { setConfirmPw(e.target.value); setErrorMsg(""); }}
                                        placeholder="Re-enter your password"
                                        autoComplete="new-password"
                                    />
                                    <button className="rp-toggle" onClick={() => setShowConfirm((s) => !s)} type="button" tabIndex={-1}>
                                        {showConfirm ? "🙈" : "👁"}
                                    </button>
                                    {confirmStatus === "success" && (
                                        <span style={{ color: "#3dba7c", marginLeft: 8, fontSize: "1rem" }}>✓</span>
                                    )}
                                </div>
                                {confirmStatus === "error" && (
                                    <p className="rp-field-msg error">Passwords do not match.</p>
                                )}
                            </div>

                            {/* Error banner */}
                            {errorMsg && (
                                <div className="rp-error-msg">
                                    ⚠ {errorMsg}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                className="rp-btn-primary"
                                onClick={handleSubmit}
                                disabled={!canSubmit || loading}
                                type="button"
                            >
                                {loading
                                    ? <><span className="rp-spinner" /> Updating Password…</>
                                    : "🔓 Update Password →"
                                }
                            </button>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button className="rp-back" onClick={onNavigateToLogin} type="button">
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
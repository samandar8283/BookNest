import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAlert} from "../../contexts/AlertContext"

const AuthModal = ({ open, onClose, mode }) => {
    const navigate = useNavigate();
    const [currentMode, setCurrentMode] = useState(mode);
    const {addAlert} = useAlert();

    useEffect(() => {
        if(open) setCurrentMode(mode);
    }, [open, mode]);

    if (!open || !mode) return null;
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
                firstName: user.displayName?.split(" ")[0] || "",
                lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
                email: user.email,
                photoURL: user.photoURL || null,
                lastLogin: serverTimestamp(),
                createdAt: serverTimestamp()
            }, { merge: true });
            onClose();
            addAlert("Google orqali muvaffaqiyatli tizimga kirdingiz!", "success");
        } catch (err) {
            console.error(err.message);
            addAlert("Google Sign-In xatolik yuz berdi!", "danger");
        }
    }

    return (
        <>
            <div className="modal-backdrop show" onClick={onClose}></div>

            <div className="modal show d-block" tabIndex="-1" onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content p-4 rounded-4 shadow">
                        <div className="modal-header border-0 pb-0 mb-4">
                            <h5 className="modal-title fw-bold fs-3">
                                <img src="/images/logo.png" alt="logo" className="logo me-2" /><span className="logo-name fw-bold">BookNest</span>
                            </h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body py-0">
                            {currentMode === "login" ? <Login onLoginClose={onClose} /> : <Signup onSignupClose={onClose} onLoginClick={() => setCurrentMode("login")} />}
                            <div className="text-center my-1">
                                <span className="text-muted">or</span>
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-bold"
                                onClick={handleGoogleSignIn}
                            >
                                <img
                                    src="/images/google.png"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                Continue with Google
                            </button>
                        </div>


                        <div className="modal-footer justify-content-center border-0 pt-0 mt-3">
                            {currentMode === "login" ? (
                                <p className="mb-0">
                                    Yangi foydalanuvchi?{" "}
                                    <span
                                        className="text-primary cursor-pointer-custom fw-bold"
                                        onClick={() => setCurrentMode("signup")}
                                    >
                                        Ro'yxatdan o'tish
                                    </span>
                                </p>
                            ) : (
                                <p className="mb-0">
                                    Hisobingiz bormi?{" "}
                                    <span
                                        className="text-primary cursor-pointer-custom fw-bold"
                                        onClick={() => setCurrentMode("login")}
                                    >
                                        Tizimga kirish
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthModal;
import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const Signup = ({ onSignupClose, onLoginClick }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { addAlert } = useAlert();

    const validate = (firstname, lastname, email, password) => {
        if (!firstname || !lastname || !email || !password) {
            addAlert("Iltimos, barcha majburiy maydonlarni to'ldiring!", "danger");
            return true;
        }
        if (password.length < 8) {
            addAlert("Parol kamida 8 ta belgidan iborat bo'lishi kerak!", "danger");
            return true;
        }
        return false;
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        if (validate(firstName, lastName, email, password)) return;

        setLoading(true);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(res.user, {
                displayName: `${firstName} ${lastName}`
            });

            await sendEmailVerification(res.user);

            await setDoc(doc(db, "users", res.user.uid), {
                firstName,
                lastName,
                email,
                createdAt: serverTimestamp()
            });

            addAlert("Ro'yxatdan o'tish muvaffaqiyatli! Iltimos, elektron pochtangizni tasdiqlang.", "success");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setSuccessMessage("Ro'yxatdan o'tish muvaffaqiyatli! Iltimos, elektron pochtangizni tasdiqlang.");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                addAlert("Bu email manzili allaqachon ro'yxatdan o'tgan.", "danger");
            } else {
                addAlert(err.message, "danger");
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSignup} className="d-flex flex-column gap-3">
            {successMessage ? (
                <div className="text-center">
                    <p className="fw-bold">{successMessage}</p>
                    <button
                        type="button"
                        className="btn btn-primary rounded-pill mt-3 w-100"
                        onClick={onLoginClick}
                    >
                        Login sahifasiga o'tish
                    </button>
                </div>
            ) : (
                <>
                    <input
                        type="text"
                        name="firstname"
                        autoComplete="firstname"
                        placeholder="Ism"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control rounded-pill px-3 py-2"
                    />
                    <input
                        type="text"
                        name="lastname"
                        autoComplete="lastname"
                        placeholder="Familiya"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control rounded-pill px-3 py-2"
                    />
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control rounded-pill px-3 py-2"
                    />
                    <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control rounded-pill px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary rounded-pill fw-bold w-100"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Ro'yxatdan o'tish"}
                    </button>
                </>
            )}
        </form>
    );
};

export default Signup;

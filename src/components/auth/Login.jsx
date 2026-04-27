import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAlert } from "../../contexts/AlertContext";

const Login = ({ onLoginClose }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { addAlert } = useAlert();

    const validate = (email, password) => {
        if (!email || !password) {
            addAlert("Iltimos, barcha majburiy maydonlarni to'ldiring!", "danger");
            return true;
        }
        if (password.length < 8) {
            addAlert("Parol kamida 8 ta belgidan iborat bo'lishi kerak!", "danger");
            return true;
        }
        return false;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validate(email, password)) return;

        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            if (!res.user.emailVerified) {
                addAlert("E-pochta manzilingizni tasdiqlang!", "danger");
                setLoading(false)
                return;
            }

            addAlert("Tizimga muvaffaqiyatli kirdingiz!", "success");
            onLoginClose();
        } catch (err) {
            addAlert(err.message, "danger");
        }
        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control rounded-pill px-3 py-2"
                />
                <input
                    type="password"
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
                    {loading ? "Loading..." : "Tizimga kirish"}
                </button>
            </form>
        </>
    );
};

export default Login;

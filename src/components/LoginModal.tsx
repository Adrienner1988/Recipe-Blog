import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");

    const handleAuth = async () => {
        setError("");
        try {
            if (isSignup) {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                if (cred.user && name.trim()) {
                    await updateProfile(cred.user, {
                        displayName: name.trim(),
                    });
                }
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onClose(); // close modal on success
        } catch (err: any) {
            console.error("Auth error:", err.message);
            setError(err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
                <button onClick={onClose} className="absolute top-2 right-3 text-lg font-bold text-primary hover:text-secondary"><IoIosCloseCircleOutline /></button>
                <h2 className="text-xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>

                {isSignup && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-3 px-3 py-2 border rounded"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                />

                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                <button
                    onClick={handleAuth}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded font-semibold"
                >
                    {isSignup ? "Sign Up" : "Login"}
                </button>

                <p className="mt-4 text-sm text-center">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline">
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;

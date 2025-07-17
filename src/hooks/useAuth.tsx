import { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged, User, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  login: async () => { },
  logout: async () => { }, 
});
  
  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);


  // Ensure displayName is updated immediately after login/signup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // ensure we get the updated displayName
        setUser(auth.currentUser); // get the freshly reloaded user
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
  };

  const login = async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
        throw error;
      }
  };

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

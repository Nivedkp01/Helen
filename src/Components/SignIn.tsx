import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch nickname from Firestore after sign-in
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUser({
            ...user,
            nickname: userDoc.data().nickname,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch nickname from Firestore after sign-in
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUser({
          ...user,
          nickname: userDoc.data().nickname,
        });
      }

      // Redirect to home page after successful sign-in
      navigate("/learn");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user state after sign-out
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        {user ? (
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="User Icon"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm text-gray-800">
              {user.nickname || user.displayName || "Nickname"}
            </span>
            <button
              onClick={handleSignOut}
              className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300 mt-4"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import { auth } from "../firebase/index";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function useSignIn() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, signIn };
}

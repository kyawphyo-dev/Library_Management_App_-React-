import React, { useState } from "react";
import { auth } from "../firebase/index";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function useSignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, signUp };
}

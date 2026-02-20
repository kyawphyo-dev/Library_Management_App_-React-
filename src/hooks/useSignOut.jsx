import React, { useState } from "react";
import { auth } from "../firebase/index";
import { signOut } from "firebase/auth";

export default function useSignOut() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await signOut(auth);
      setLoading(false);
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, logout };
}

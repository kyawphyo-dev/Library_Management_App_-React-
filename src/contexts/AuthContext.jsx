import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/index";

let AuthContext = createContext();
let AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_READY":
      return { ...state, authReady: true };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  let [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    authReady: false,
  });

  useEffect(() => {
    //Check user login status on app load
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_READY" });
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
        console.log("User is logged in:", user);
      } else {
        console.log("User is logged out");
        dispatch({ type: "LOGOUT" });
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

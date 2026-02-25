import React from "react";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let navigate = useNavigate();
  let { error, loading, signIn } = useSignIn();
  let login = async (e) => {
    e.preventDefault();
    let user = await signIn(email, password);

    if (user) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };
  return (
    <div className="mx-auto mt-10 w-120">
      <form
        className="bg-bg shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={login}
      >
        <div className="mb-4">
          <h1 className=" text-2xl mb-3 text-center">Login Form</h1>
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight"
            id="username"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text mb-3"
            id="password"
            type="password"
            placeholder="password"
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-primary-hover flex justify-center items-center w-full text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {loading && (
              <svg
                className="mr-3 -ml-1 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Login
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-primary hover:text-primary-hover"
          >
            {" "}
            Create an account
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../server/server";

const Login = ({ setIsLoggedIn, setUserInfo, t }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      navigate("/");
      const token = response.token;
      const userId = response.userId;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", userId);
      console.log("res", response);
      setUserInfo(email);
      setIsLoggedIn(() => true);
    } catch (err) {
      if (err.response) {
        if (e.status === 403) {
          setError("Your account is blocked. Please contact support.");
        } else {
          setError("Invalid email or password");
        }
      } else {
        setError("Failed to login!");
      }
    }
    console.log(email, password);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80%] mt-10">
      <form
        onSubmit={handleLogin}
        className=" w-[85%] md:w-[40%] h-[60%] flex flex-col bg-[#A0AECD] dark:bg-gray-100/20 p-10 rounded shadow-md"
      >
        <label
          htmlFor="email"
          className="dark:text-white font-semibold text-[20px]"
        >
          Email:
        </label>
        <input
          type="email"
          className="outline-none  p-1 bg-transparent border-b-2 border-black dark:border-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="password"
          className="font-semibold dark:text-white text-[20px] mt-5"
        >
          Password:
        </label>
        <input
          type="password"
          className="outline-none  p-1 bg-transparent border-b-2 text-black border-black dark:border-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
        >
          {t("login")}
        </button>
        <span
          onClick={() => navigate("/register")}
          className="text-[17px] font-serif dark:text-white cursor-pointer"
        >
          {t("loginMsg")}
        </span>
      </form>
      {error && (
        <div>
          <h1 className="mt-3 text-[1.3rem] text-red-800">{error}</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
Login;

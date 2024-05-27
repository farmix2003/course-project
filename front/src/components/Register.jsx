/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../server/server";

const Login = ({ t }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = registerUser(username, email, password);
      console.log(response.data);
      navigate("/login");
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80%] mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] md:w-[40%] h-[90%] flex flex-col bg-[#A0AECD] dark:bg-gray-100/20 p-10 rounded shadow-md"
      >
        <label
          htmlFor="text"
          className="dark:text-white font-semibold text-[18px] "
        >
          Username:
        </label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="outline-none dark:text-white p-1 bg-transparent border-b-2 border-black dark:border-white"
        />

        <label
          htmlFor="email"
          className="dark:text-white font-semibold text-[18px] mt-5"
        >
          Email:
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none dark:text-white  p-1 bg-transparent border-b-2 border-black dark:border-white"
        />
        <label
          htmlFor="password"
          className="font-semibold dark:text-white text-[18px] mt-5"
        >
          Password:
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none dark:text-white p-1 bg-transparent border-b-2 text-black border-black dark:border-white"
        />
        <button
          type="submit"
          className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
        >
          {t("register")}
        </button>
        <span
          onClick={() => navigate("/login")}
          className="text-[17px] font-serif dark:text-white cursor-pointer"
        >
          {t("registerMsg")}
        </span>
      </form>
    </div>
  );
};

export default Login;

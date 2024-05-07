import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-[80%]">
      <form className=" w-[85%] md:w-[40%] h-[60%] flex flex-col bg-[#A0AECD] dark:bg-gray-100/20 p-10 rounded shadow-md">
        <label
          htmlFor="email"
          className="dark:text-white font-semibold text-[20px]"
        >
          Email:
        </label>
        <input
          type="email"
          className="outline-none  p-1 bg-transparent border-b-2 border-black dark:border-white"
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
        />
        <button
          type="submit"
          className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
        >
          Login
        </button>
        <span
          onClick={() => navigate("/register")}
          className="text-[17px] font-serif dark:text-white cursor-pointer"
        >
          You do not have an account?
        </span>
      </form>
    </div>
  );
};

export default Login;
Login;

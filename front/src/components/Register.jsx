import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-[80%] mt-10">
      <form className="w-[80%] md:w-[40%] h-[90%] flex flex-col bg-[#A0AECD] dark:bg-gray-100/20 p-10 rounded shadow-md">
        <label
          htmlFor="email"
          className="dark:text-white font-semibold text-[18px] "
        >
          First Name:
        </label>
        <input
          type="text"
          className="outline-none dark:text-white p-1 bg-transparent border-b-2 border-black dark:border-white"
        />
        <label
          htmlFor="email"
          className="dark:text-white font-semibold text-[18px] mt-5"
        >
          Last Name:
        </label>
        <input
          type="text"
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
          className="outline-none dark:text-white p-1 bg-transparent border-b-2 text-black border-black dark:border-white"
        />
        <button
          type="submit"
          className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
        >
          Register
        </button>
        <span
          onClick={() => navigate("/login")}
          className="text-[17px] font-serif dark:text-white cursor-pointer"
        >
          You have an account?
        </span>
      </form>
    </div>
  );
};

export default Login;
Login;

/* eslint-disable react/prop-types */

import { DarkMode, LightMode } from "@mui/icons-material";
import SearchBar from "./SearchBar";
const Navbar = ({ handleThemeChange, theme }) => {
  return (
    <div className="h-[60px] w-screen p-1 md:p-5 bg-blue-500 flex border-white justify-between items-center dark:bg-gray-600/10 dark:text-white">
      <div>
        <h1 className=" text-xl md:text-3xl font-bold  dark:text-gray-200 ">
          Home
        </h1>
      </div>

      <SearchBar />

      <div className="flex justify-between items-center">
        <button className="hidden md:flex text-white">Admin</button>
        <button
          className="border rounded text-[12px] md:text-[18px] border-black dark:text-white dark:border-white ml-2 mr-2 md:ml-4 md:mr-7 p-1 text-[#110022] "
          onClick={handleThemeChange}
        >
          {theme === "light" ? <LightMode /> : <DarkMode />}
        </button>
        <select className="bg-transparent mr-1 md:mr-5 dark:border-white border border-black outline-none rounded">
          <option className="text-black">ENG</option>
          <option className="text-black">UZB</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;

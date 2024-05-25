/* eslint-disable react/prop-types */

import { DarkMode, LightMode, Login, Logout } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../server/server";
// import useUserInfo from "../server/userInfo";

const Navbar = ({
  handleThemeChange,
  theme,
  isLoggedIn,
  setIsLoggedIn,
  isAdmin,
  languages,
  i18n,
  t,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    // logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="h-[60px] w-screen p-3 md:p-5 bg-[#A0AECD] flex border-white justify-between items-center dark:bg-gray-600/10 dark:text-white">
      <div>
        <h1
          onClick={() => navigate("/")}
          className=" text-xl md:text-3xl font-bold cursor-pointer dark:text-gray-200 "
        >
          {t("home")}
        </h1>
      </div>
      <div className="hidden md:block">
        {" "}
        <SearchBar />
      </div>
      <div className="flex justify-between items-center">
        {isLoggedIn && isAdmin && (
          <button
            className=" md:flex dark:text-white font-semibold"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        )}
        <button
          className="border rounded text-[12px] md:text-[18px] border-black dark:text-white dark:border-white ml-2 mr-2 md:ml-4 md:mr-7 p-1 text-[#110022]"
          onClick={handleThemeChange}
        >
          {theme === "light" ? <LightMode /> : <DarkMode />}
        </button>
        <select
          className="bg-transparent mr-1 md:mr-5 dark:border-white border border-black outline-none rounded"
          onChange={handleLanguageChange}
          value={i18n.language}
        >
          {languages.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              className="text-black text-[10px] md:text-[17px]"
            >
              {lang.name}
            </option>
          ))}
        </select>
        {isLoggedIn ? (
          <Logout sx={{ cursor: "pointer" }} onClick={handleLogout} />
        ) : (
          <Login
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import { useTranslation } from "react-i18next";
import { getAllUsers } from "./server/server";
function App() {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const t = useTranslation();
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.log("Error getting users", error);
      }
    };
    getUsers();
  }, [isLoggedIn, users]);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:bg-[#110022] h-screen w-screen">
      <Navbar
        t={t}
        handleThemeChange={handleThemeChange}
        theme={theme}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={<AdminPanel users={users} user={user} setUsers={setUsers} />}
        />
      </Routes>
    </div>
  );
}

export default App;

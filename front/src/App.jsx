import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import { useTranslation } from "react-i18next";
import { createCollection, getCollections, getAllUsers } from "./server/server";
import ItemForm from "./components/ItemForm";
import CollectionForm from "./components/CollectionForm";
import EditCollection from "./components/EditCollection";
import CollectionItemCard from "./components/CollectionItemCard";
import AddNewItem from "./components/AddNewItem";
import CollectionCard from "./components/CollectionCard";
function App() {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [singleCollection, setSingleCollection] = useState([]);
  const customFields = [
    { name: "Custom Field 1", type: "text" },
    { name: "Custom Field 2", type: "number" },
    { name: "Custom Field 3", type: "date" },
  ];

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
  const handleCreateCollection = async (
    title,
    description,
    category,
    image,
    customFields
  ) => {
    try {
      const response = await createCollection(
        title,
        description,
        category,
        image,
        customFields
      );
      return response;
    } catch (error) {
      console.log("Error creating collection", error);
      throw new Error();
    }
  };
  useEffect(() => {
    const getAllCollections = async () => {
      try {
        const response = await getCollections();
        setCollections(response);
      } catch (error) {
        console.log("Error getting collections", error);
      }
    };
    getAllCollections();
  }, [isLoggedIn, collections]);
  const handleCreateItem = (newItem) => {
    setItems([...items, newItem]);
  };
  let isAdmin = users.find(
    (user) => user.email === userInfo && user.role === "admin"
  );

  return (
    <div className="dark:bg-[#110022] min-h-screen w-screen overflow-y-scroll overflow-x-hidden">
      <Navbar
        t={t}
        handleThemeChange={handleThemeChange}
        theme={theme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userInfo={userInfo}
        isAdmin={isAdmin}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              collections={collections}
              setCollections={setCollections}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              userInfo={userInfo}
              users={users}
              setSingleCollection={setSingleCollection}
            />
          }
        />
        <Route path="/home" element={<Home collections={collections} />} />
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <AdminPanel users={users} user={userInfo} setUsers={setUsers} />
          }
        />
        <Route
          path="/create-collection"
          element={
            <CollectionForm onCreateCollection={handleCreateCollection} />
          }
        />
        <Route
          path="/create-collection-item"
          element={
            <ItemForm
              onCreateItem={handleCreateItem}
              customFields={customFields}
            />
          }
        />
        <Route path="/collection/card" element={<CollectionCard />} />
        <Route
          path="/collections/item/:id"
          element={<CollectionItemCard singleCollection={singleCollection} />}
        />
        <Route path="/edit-collection" element={<EditCollection />} />
        <Route
          path="/collection/add-item"
          element={<AddNewItem singleCollection={singleCollection} />}
        />
      </Routes>
    </div>
  );
}

export default App;

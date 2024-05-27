import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import { useTranslation } from "react-i18next";
import {
  createCollection,
  getCollections,
  getAllUsers,
  getLatestItem,
  getLargestCollections,
} from "./server/server";
import ItemForm from "./components/ItemForm";
import CollectionForm from "./components/CollectionForm";
import EditCollection from "./components/EditCollection";
import CollectionItemCard from "./components/CollectionItemCard";
import AddNewItem from "./components/AddNewItem";
import CollectionCard from "./components/CollectionCard";
import EditCollectionItem from "./components/EditCollectionItem";
import SearchBar from "./components/SearchBar";
function App() {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [singleCollection, setSingleCollection] = useState([]);
  const [singleCollectionItem, setSingleCollectionItem] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [latestItem, setLatestItems] = useState([]);
  const [topCollections, setTopCollections] = useState([]);
  const navigate = useNavigate();
  const customFields = [
    { name: "Custom Field 1", type: "text" },
    { name: "Custom Field 2", type: "number" },
    { name: "Custom Field 3", type: "date" },
  ];
  const { t, i18n } = useTranslation();
  const languages = [
    { code: "en", name: "English" },
    { code: "uz", name: "Uzbek" },
  ];

  useEffect(() => {
    const getTopCollections = async () => {
      try {
        const response = await getLargestCollections();
        setTopCollections(response.collections);
      } catch (error) {
        console.log("Error", error);
        throw new Error();
      }
    };
    getTopCollections();
  }, []);

  useEffect(() => {
    const getLatestItems = async () => {
      try {
        const response = await getLatestItem();
        setLatestItems(response);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    getLatestItems();
  }, []);

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
      // setIsLoggedIn(true);
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
        // setIsLoggedIn(true);
      } catch (error) {
        console.log("Error getting collections", error);
      }
    };
    getAllCollections();
  }, [isLoggedIn, collections]);
  const handleCreateItem = (newItem) => {
    setItems([...items, newItem]);
  };
  const handleOpenEditCollection = (collection) => {
    setCollectionData(collection);
    navigate("/edit-collection");
  };
  let isAdmin = users.find(
    (user) => user.email === userInfo && user.role === "admin"
  );
  const handleOpenEditItem = (items) => {
    setSingleCollectionItem(items);
    navigate("/collection/edit-item");
  };
  return (
    <div className="app bg-slate-100 dark:bg-[#110022] min-h-screen w-screen sm:overflow-y-scroll overflow-x-hidden md:overflow-x-hidden">
      <Navbar
        t={t}
        i18n={i18n}
        languages={languages}
        handleThemeChange={handleThemeChange}
        theme={theme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userInfo={userInfo}
        isAdmin={isAdmin}
      />
      <div className="block md:hidden w-[100%] ml-5 mt-2">
        <SearchBar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              t={t}
              collections={collections}
              setCollections={setCollections}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              userInfo={userInfo}
              users={users}
              setCollectionData={setCollectionData}
              setSingleCollection={setSingleCollection}
              handleOpenEditCollection={handleOpenEditCollection}
              latestItems={latestItem}
              topCollections={topCollections}
              setLatestItems={setLatestItems}
            />
          }
        />
        <Route path="/home" element={<Home collections={collections} />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserInfo={setUserInfo}
              t={t}
            />
          }
        />
        <Route path="/register" element={<Register t={t} />} />
        <Route
          path="/admin"
          element={
            <AdminPanel
              t={t}
              users={users}
              user={userInfo}
              setUsers={setUsers}
            />
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
          element={
            <CollectionItemCard
              singleCollection={singleCollection}
              t={t}
              handleOpenEditItem={handleOpenEditItem}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/edit-collection"
          element={
            <EditCollection
              collectionData={collectionData}
              setCollectionData={setCollectionData}
              t={t}
            />
          }
        />
        <Route
          path="/collection/add-item"
          element={<AddNewItem singleCollection={singleCollection} t={t} />}
        />
        <Route
          path="/collection/edit-item"
          element={
            <EditCollectionItem
              singleCollection={singleCollection}
              singleCollectionItem={singleCollectionItem}
              t={t}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

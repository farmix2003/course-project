/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { deleteCollection } from "../server/server";

const Home = ({
  collections,
  setCollections,
  isLoggedIn,
  isAdmin,
  users,
  setSingleCollection,
  handleOpenEditCollection,
  setCollectionData,
  t,
}) => {
  const navigate = useNavigate();

  const handleDeleteCollection = async (id) => {
    try {
      await deleteCollection(id);
      setCollections(() =>
        collections.filter((collection) => collection._id !== id)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="dark:text-white flex flex-col items-start gap-4 ml-5 p-5">
      {isLoggedIn && (
        <button
          onClick={() => navigate("/create-collection")}
          className="mt-5 bg-[#A0AECD] dark:bg-red-500/30 rounded p-1 dark:text-white font-semibold text-[20px]"
        >
          {t("createCollection")}
        </button>
      )}
      <div className="flex flex-wrap gap-2">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection._id} className="">
              <CollectionCard
                t={t}
                collection={collection}
                handleDeleteCollection={handleDeleteCollection}
                isAdmin={isAdmin}
                users={users}
                isLoggedIn={isLoggedIn}
                setCollectionData={setCollectionData}
                setSingleCollection={setSingleCollection}
                handleOpenEditCollection={handleOpenEditCollection}
              />
            </div>
          ))
        ) : (
          <h2>No collection created yet</h2>
        )}
      </div>
    </div>
  );
};

export default Home;

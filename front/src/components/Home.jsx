/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { deleteCollection } from "../server/server";

const Home = ({
  collections,
  setCollections,
  isLoggedIn,
  isAdmin,
  userInfo,
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
    <div className="dark:text-white flex flex-col items-start gap-4 ml-5">
      {isLoggedIn ? (
        <button
          onClick={() => navigate("/create-collection")}
          className="dark:text-white my-5"
        >
          Create collection
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="dark:text-white my-5"
        >
          Create collection
        </button>
      )}
      <div className="flex flex-wrap gap-2">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection._id} className="">
              <CollectionCard
                collection={collection}
                handleDeleteCollection={handleDeleteCollection}
                isAdmin={isAdmin}
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

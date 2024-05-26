/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { deleteCollection, getCollection } from "../server/server";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import useUserInfo from "../server/userInfo";

const Home = ({
  collections,
  setCollections,
  isLoggedIn,
  isAdmin,
  users,
  setSingleCollection,
  handleOpenEditCollection,
  setCollectionData,
  latestItems,
  topCollections,
  t,
}) => {
  console.log(latestItems);
  const navigate = useNavigate();
  const [isSeeAll, setIsSeeAll] = useState(false);
  const { userInfo } = useUserInfo();
  const getSingleCollection = async (id, collection) => {
    try {
      if (collection) {
        setCollectionData(collection);
        setSingleCollection(collection);
        navigate(`/collections/item/${id}`);
      } else {
        const response = await getCollection(id);
        console.log(response);
        setCollectionData(response);
        setSingleCollection(response);
        navigate(`/collections/item/${id}`);
      }
    } catch (e) {
      console.log("Error while getting collection");
    }
  };

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
  const handleIsSeeAll = () => {
    setIsSeeAll(!isSeeAll);
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
      <div className="flex flex-col flex-wrap gap-10">
        <h1 className="text-[30px]">Recently Added Items</h1>
        <div className="flex flex-col gap-3 items-start w-[93%]">
          {latestItems?.map((item, i) => (
            <div key={i} className="w-full">
              <div className="flex bg-[#A0AECD] items-center justify-between dark:bg-gray-500/20 gap-5 p-3 rounded">
                <div className="flex gap-10">
                  <h5>Collection: {item.collection}</h5>
                  <span>Item: {item.name}</span>
                  {item?.customFields?.map((item, idx) => (
                    <b key={idx} className="italic">
                      <span className="font-normal not-italic">
                        {item.name}:
                      </span>{" "}
                      {item.value}
                    </b>
                  ))}
                </div>
                <button
                  onClick={() => {
                    console.log(
                      item.collectionId,
                      collections.find(
                        (collection) => collection._id === item.collectionId
                      )
                    );
                    getSingleCollection(
                      item.collectionId,

                      collections.find(
                        (collection) => collection._id === item.collectionId
                      )
                    );
                  }}
                  className="px-[2px] py-[1px] font-semibold bg-gray-600/20 dark:bg-red-700/20 rounded"
                >
                  Jump
                </button>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-[30px]">Top Collections</h1>
        <div className="flex gap-2 w-screen flex-wrap">
          {topCollections.map((collection, i) => (
            <div
              key={i}
              className="flex items-center bg-[#A0AECD] dark:bg-gray-500/20 rounded "
            >
              <div className="w-[300px] rounded h-[300px] p-2  flex flex-col items-start justify-evenly">
                <h1 className="bg-gray-50/20 dark:bg-slate-400/20 w-full p-1 text-[20px] rounded">
                  {collection.title}
                </h1>

                <i className="bg-gray-50/20 dark:bg-slate-400/20 w-full p-1 text-[15px] rounded">
                  {collection.description}
                </i>
                <u className="bg-gray-50/20 dark:bg-slate-400/20 w-full p-1 text-[15px] rounded">
                  {collection.category}
                </u>

                <div>
                  <button
                    className="text-green-600 text-[20px]"
                    onClick={() =>
                      getSingleCollection(collection._id, collection)
                    }
                  >
                    <Visibility />
                  </button>
                  {((isLoggedIn && userInfo?.role === "admin") ||
                    userInfo?._id === collection?.user_id) && (
                    <>
                      <>
                        <button
                          className="text-red-600"
                          onClick={() => handleDeleteCollection(collection._id)}
                        >
                          <Delete />
                        </button>
                        <button
                          className=" text-teal-700"
                          onClick={() => handleOpenEditCollection(collection)}
                        >
                          <Edit />
                        </button>
                      </>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {!isSeeAll && (
            <button
              onClick={handleIsSeeAll}
              className="px-10 py-1 rounded mt-[-30px] bg-gray-600/20 dark:bg-red-700/20 text-[20px] font-semibold"
            >
              See all
            </button>
          )}
        </div>
        {isSeeAll && (
          <>
            <h1 className="text-[30px]">All Collections</h1>
            <div className="flex flex-wrap gap-2">
              {collections.length > 0 ? (
                collections.map((collection) => (
                  <div key={collection._id} className="flex">
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
                      getSingleCollection={getSingleCollection}
                    />
                  </div>
                ))
              ) : (
                <h2>No collection created yet</h2>
              )}
            </div>
          </>
        )}
        <div>
          {isSeeAll && (
            <button
              onClick={handleIsSeeAll}
              className="px-10 py-1 rounded mt-[-30px] bg-gray-600/20 dark:bg-red-700/20 text-[20px] font-semibold"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

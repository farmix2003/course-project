import { Delete, Edit, Visibility } from "@mui/icons-material";

import useUserInfo from "../server/userInfo";
import { getCollection } from "../server/server";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CollectionCard = ({
  collection,
  handleDeleteCollection,
  handleOpenEditCollection,
  isLoggedIn,
  setSingleCollection,
  setCollectionData,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  const canEditOrRemove =
    isLoggedIn &&
    (userInfo?.role === "admin" || userInfo?._id === collection?.user_id);

  const getSingleCollection = async (id, collection) => {
    try {
      const response = await getCollection(id);
      console.log(response);
      setCollectionData(response);
      setSingleCollection(collection);
      navigate(`/collections/item/:${id}`);
    } catch (e) {
      console.log("Error while getting collection");
    }
  };

  return (
    <div className="flex items-center bg-[#A0AECD] dark:bg-gray-500/20 rounded ">
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
          <button className="text-green-600 text-[20px]">
            <Visibility
              onClick={() => getSingleCollection(collection._id, collection)}
            />
          </button>
          {canEditOrRemove && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;

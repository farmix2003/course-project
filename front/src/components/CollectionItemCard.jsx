/* eslint-disable react/prop-types */

import { Comment, Delete, Edit, Favorite } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addComment, deleteItem, getItems } from "../server/server";
import useUserInfo from "../server/userInfo";
import CommentsCard from "./CommentsCard";
const CollectionItemCard = ({ singleCollection, t, handleOpenEditItem }) => {
  const navigate = useNavigate();
  const [collectionItems, setCollectionItems] = useState([]);
  const { userInfo } = useUserInfo();
  const [activeCommentItemId, setActiveCommentItemId] = useState(null);
  const [text, setText] = useState("");
  useEffect(() => {
    const getAllItems = async () => {
      try {
        if (singleCollection?._id) {
          const response = await getItems(singleCollection._id);
          setCollectionItems(response ? response.items : []);
        }
      } catch (error) {
        console.error("Error while getting collection items:", error);
        setCollectionItems([]);
      }
    };

    getAllItems();
  }, [singleCollection._id]);

  const handleDeleteCollectionItem = async (itemId) => {
    try {
      await deleteItem(singleCollection._id, itemId);
      setCollectionItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCommentClick = (itemId) => {
    setActiveCommentItemId((prevId) => (prevId === itemId ? null : itemId)); // Toggle the comment input
  };
  const handleCancel = () => {
    navigate(`/`);
  };
  const handleSubmit = async (itemId) => {
    try {
      const response = await addComment(singleCollection._id, itemId, text);
      setText("");
      setActiveCommentItemId(null);
      return response;
    } catch (error) {
      console.log("Error to add comment", error);
      throw new Error();
    }
  };
  return (
    <div className="dark:text-white bg-gray-500/20 mt-3 w-[95%] rounded-md mx-auto flex flex-col gap-2 p-10">
      <h1 className="text-[30px] font-semibold">{singleCollection.title}</h1>
      <h2 className="text-[20px] font-semibold">{t("colletionItems")}</h2>
      {collectionItems.length > 0 ? (
        collectionItems?.map((item) => (
          <div
            key={item._id}
            className="flex gap-10 bg-[#A0AECD] mt-2 dark:bg-gray-500/20 p-2 rounded"
          >
            <h5>{item.title}</h5>
            {item?.customFields?.map((item, idx) => (
              <b key={idx}>{item.value}</b>
            ))}
            <span>{item.tags}</span>
            <div>
              <Comment
                sx={{ cursor: "pointer" }}
                onClick={() => handleCommentClick(item._id)}
              />
              <button className="dark:text-red-600 text-white">
                <Favorite />
              </button>
              {activeCommentItemId === item._id && (
                <div>
                  <input
                    className="bg-transparent outline-none border-b-2 border-black dark:border-white"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="text-green-700 font-semibold"
                      onClick={() => handleSubmit(item._id)}
                    >
                      {t("add")}
                    </button>
                    <button
                      className="text-red-600 font-semibold"
                      onClick={() => setActiveCommentItemId(null)}
                    >
                      {t("cancelEdit")}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <CommentsCard item={item} singleCollection={singleCollection} />
            </div>
            <div>
              {(userInfo?.role === "admin" ||
                userInfo?._id === singleCollection?.user_id) && (
                <>
                  <Edit
                    onClick={() => handleOpenEditItem(item)}
                    sx={{ cursor: "pointer" }}
                  />
                  <Delete
                    onClick={() => handleDeleteCollectionItem(item?._id)}
                    sx={{ cursor: "pointer" }}
                  />
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <h2>No item available </h2>
      )}
      <div>
        {(userInfo?.role === "admin" ||
          userInfo?._id === singleCollection.user_id) && (
          <>
            <button
              onClick={() => navigate("/collection/add-item")}
              className="mt-5 mr-2 bg-[#A0AECD] dark:bg-red-500/30 rounded p-1 dark:text-white font-semibold text-[20px]"
            >
              {t("addNew")}
            </button>
          </>
        )}
        <button
          className="mt-5 bg-[#A0AECD] dark:bg-red-500/30 rounded p-1 dark:text-white font-semibold text-[20px]"
          onClick={handleCancel}
        >
          {t("home")}
        </button>
      </div>
    </div>
  );
};

export default CollectionItemCard;

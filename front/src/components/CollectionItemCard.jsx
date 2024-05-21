/* eslint-disable react/prop-types */

import { Comment, Delete, Edit, Favorite } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItems } from "../server/server";

const CollectionItemCard = ({ singleCollection }) => {
  const navigate = useNavigate();
  const [collectionItems, setCollectionItems] = useState([]);

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

  const handleDeleteCollectionItem = async (collectionId, itemId) => {
    await deleteItem(collectionId, itemId);
    setCollectionItems(collectionItems.filter((item) => item.id !== itemId));
  };
  return (
    <div className="dark:text-white flex flex-col gap-2 p-10">
      <h2>Collection Items</h2>
      {collectionItems.length > 0 ? (
        collectionItems?.map((item) => (
          <div key={item._id}>
            <h5>{item.title}</h5>
            <span>{item.tags}</span>
            <div>
              <Comment />
              <Favorite sx={{ color: "red" }} />
            </div>
            <div>
              <Edit />
              <Delete
              // onClick={handleDeleteCollectionItem()
              // singleCollection?._id,
              // item?._id
              // }
              />
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
      <div>
        <button onClick={() => navigate("/collection/add-item")}>
          Add New{" "}
        </button>
      </div>
    </div>
  );
};

export default CollectionItemCard;

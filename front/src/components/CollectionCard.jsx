import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import useUserInfo from "../server/userInfo";
import { getCollection } from "../server/server";
import EditCollection from "./EditCollection";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CollectionCard = ({
  collection,
  handleDeleteCollection,
  isLoggedIn,
  setSingleCollection,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const [collectionData, setCollectionData] = useState(collection);
  const [isEdititng, setIsEditing] = useState();

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-[200px] h-[200px] border border-red-400 flex flex-col items-start justify-evenly">
      <h1>{collection.title}</h1>

      <b>{collection.description}</b>
      <span>{collection.category}</span>
      {collection?.customFields?.map((field) => (
        <div key={field._id}>
          <span>{field.name}</span>
        </div>
      ))}

      <div>
        <button>
          <Visibility
            onClick={() => getSingleCollection(collection._id, collection)}
          />
        </button>
        {canEditOrRemove && (
          <>
            <button onClick={() => handleDeleteCollection(collection._id)}>
              <Delete />
            </button>
            <button onClick={() => handleEditClick(true)}>
              <Edit />
            </button>
          </>
        )}
      </div>
      {isEdititng && (
        <div>
          <EditCollection
            collectionData={collectionData}
            setCollectionData={setCollectionData}
            setIsEditing={setIsEditing}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionCard;

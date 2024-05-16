import { Delete, Edit, Visibility } from "@mui/icons-material";

/* eslint-disable react/prop-types */
const CollectionCard = ({ collection, handleDeleteCollection, isAdmin }) => {
  const acess = true;
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
          <Visibility />
        </button>
        {acess && (
          <>
            <button onClick={() => handleDeleteCollection(collection._id)}>
              <Delete />
            </button>
            <button>
              <Edit />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { editCollection } from "../server/server";
import { useState } from "react";

const EditCollection = ({
  setCollectionData,
  collectionData,
  setIsEditing,
}) => {
  const [formData, setFormData] = useState(collectionData);
  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCustomeFieldChange = (index, value) => {
    const newCustomFields = [...formData.customFields];
    newCustomFields[index].value = value;
    setFormData((prevState) => ({
      ...prevState,
      customFields: newCustomFields,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editCollection(collectionData._id, formData);
      console.log(response);
      console.log(FormData);
      setCollectionData(response);
    } catch (e) {
      console.log("Error while updating collection", e);
    }
  };

  return (
    <div className="absolute w-[40%] flex flex-col justify-center items-center dark:bg-gray-800 p-10 my-[-200px] mx-[60px]">
      <h1>Edit Collection</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] items-start justify-center gap-2"
      >
        <div className="flex gap-2 w-[100%] justify-between ">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleInputChange}
            required
            className="bg-transparent outline-none border-b-2 dark:border-white"
          />
        </div>
        <div className="flex gap-2 w-[100%] justify-between  items-center">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            rows={2}
            cols={22}
            className="bg-transparent outline-none border-b-2 dark:border-white"
          />
        </div>
        <div className="flex gap-2 w-[100%] justify-between items-center">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="bg-transparent outline-none border-b-2 dark:border-white"
          />
        </div>
        <div className="flex gap-2 w-[100%] justify-between items-center">
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData?.image}
            onChange={handleInputChange}
            className="bg-transparent outline-none border-b-2 dark:border-white"
          />
        </div>
        {formData?.customFields?.map((field, index) => (
          <div
            key={index}
            className="flex gap-2 w-[100%] justify-between items-center"
          >
            <label>Customized Field:</label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleCustomeFieldChange(index, e.target.value)}
              className="bg-transparent outline-none border-b-2 dark:border-white"
            />
          </div>
        ))}
        <div className="flex mt-3 gap-2 justify-around w-[100%]">
          <button
            type="submit"
            className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollection;

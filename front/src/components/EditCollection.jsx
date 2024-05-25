/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { editCollection } from "../server/server";
import { useState } from "react";

const EditCollection = ({ setCollectionData, collectionData, t }) => {
  const [formData, setFormData] = useState(collectionData);
  console.log(formData);
  const navigate = useNavigate();
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

      navigate("/");
    } catch (e) {
      console.log("Error while updating collection", e);
    }
  };

  return (
    <div className="w-[40%] mx-auto mt-10 rounded dark:text-white flex flex-col justify-center items-center bg-[#A0AECD] dark:bg-gray-800 p-10">
      <h1 className="text-[30px] my-2">{t("editCollection")}</h1>
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
            className="bg-transparent outline-none border-b-2 border-black dark:border-white"
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
            className="bg-transparent outline-none border-b-2 border-black dark:border-white"
          />
        </div>
        <div className="flex gap-2 w-[100%] justify-between items-center">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="bg-transparent outline-none border-b-2 border-black dark:border-white"
          />
        </div>
        <div className="flex gap-2 w-[100%] justify-between items-center">
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData?.image}
            onChange={handleInputChange}
            className="bg-transparent outline-none border-b-2 border-black dark:border-white"
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
              value={field.name}
              onChange={(e) => handleCustomeFieldChange(index, e.target.value)}
              className="bg-transparent outline-none border-b-2 border-black dark:border-white"
            />
          </div>
        ))}
        <div className="flex mt-3 gap-2 justify-around w-[100%]">
          <button
            type="submit"
            className="w-full mt-5 bg-green-500 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
          >
            {t("saveChanges")}
          </button>
          <button
            type="button"
            className="w-full mt-5 bg-red-500 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text-[20px]"
            onClick={() => navigate("/")}
          >
            {t("cancelEdit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollection;

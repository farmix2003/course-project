/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { editCollection } from "../server/server";
import { useState } from "react";

const EditCollection = ({ setCollectionData, collectionData, t }) => {
  const [formData, setFormData] = useState(collectionData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...formData.customFields];
    updatedFields[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      customFields: updatedFields,
    }));
  };

  const addCustomField = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      customFields: [
        ...(prevState.customFields ? prevState.customFields : []),
        { name: "", type: type, value: "" },
      ],
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
    <div className="w-[85%] md:w-[40%] mx-auto mt-10 rounded dark:text-white flex flex-col justify-center items-center bg-[#A0AECD] dark:bg-gray-800 p-1 md:p-10">
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
        <h3 className="dark:text-gray-300 text-[20px] font-semibold">
          Custom Fields
        </h3>
        <div className="flex flex-col">
          <div className="gap-3 flex flex-wrap">
            <button
              className="bg-red-600/10 p-1 rounded dark:text-white"
              type="button"
              onClick={() => addCustomField("integer")}
            >
              Add Integer Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => addCustomField("string")}
            >
              Add String Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => addCustomField("multiline")}
            >
              Add Multiline Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => addCustomField("boolean")}
            >
              Add Boolean Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => addCustomField("date")}
            >
              Add Date Field
            </button>
          </div>
          {formData?.customFields?.map((field, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-start mt-2"
            >
              <input
                className="bg-transparent dark:text-white outline-none border-b-2 border-black dark:border-white placeholder-black dark:placeholder-white"
                type="text"
                value={field.name}
                required
                onChange={(e) =>
                  handleCustomFieldChange(index, "name", e.target.value)
                }
                placeholder="Field Name"
              />
              <input
                className="bg-transparent w-[50%] dark:text-white outline-none border-b-2 border-black dark:border-white placeholder-black dark:placeholder-white"
                type="text"
                value={field.type}
                readOnly
              />
            </div>
          ))}
        </div>
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

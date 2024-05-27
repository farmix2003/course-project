import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editCollectionItem } from "../server/server";

/* eslint-disable react/prop-types */
const EditCollectionItem = ({ singleCollection, singleCollectionItem, t }) => {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    customFields: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(singleCollectionItem);
  }, [singleCollectionItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCustomFieldChange = (index, value) => {
    const newCustomFields = [...formData.customFields];
    newCustomFields[index].value = value;
    setFormData((prevState) => ({
      ...prevState,
      customFields: newCustomFields,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await editCollectionItem(
        singleCollection._id,
        singleCollectionItem._id,
        formData
      );
      navigate(`/collections/item/${singleCollection._id}`);
    } catch (error) {
      console.error(error);
      setError("Failed to edit the collection item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-md w-[85%] md:w-[50%] gap-10 p-10 dark:text-white bg-[#A0AECD] dark:bg-slate-700/10 mt-10 mx-auto items-center justify-center">
      <h2 className="text-[30px]">{t("editCollectionItem")}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-3 w-[100%]"
      >
        <div className="flex gap-2 justify-around w-full">
          <label className="font-semibold">Title:</label>
          <input
            type="text"
            className="border-b-2 border-black dark:border-white bg-transparent outline-none"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex gap-2 justify-around w-full my-1">
          <label className="font-semibold">Tags:</label>
          <input
            type="text"
            name="tags"
            className="border-b-2 border-black dark:border-white bg-transparent outline-none"
            value={formData.tags}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col justify-around items-center w-full my-1">
          <label className="m-2 text-[18px] font-semibold">
            Custom Fields:
          </label>
          {formData.customFields.map((field, index) => (
            <div key={index} className="flex gap-1 justify-around w-[92%]">
              <label className="font-semibold">{field.name}:</label>
              <input
                type="text"
                value={field.value}
                className="border-b-2 border-black dark:border-white bg-transparent outline-none"
                onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-x-10 items-center w-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 px-3 text-[18px] font-semibold rounded"
          >
            {t("saveChanges")}
          </button>
          <button className="bg-red-600 px-3 text-[18px] font-semibold rounded">
            {t("cancelEdit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollectionItem;

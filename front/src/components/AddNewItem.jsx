/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../server/server";

const AddNewItem = ({ singleCollection, t }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    customFieldValues: singleCollection?.customFields?.reduce((acc, field) => {
      acc[field.name] = field.type === "boolean" ? false : "";
      return acc;
    }, {}),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCustomFieldChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      customFieldValues: {
        ...prevState.customFieldValues,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(singleCollection._id, formData);
      navigate(`/collections/item/${singleCollection._id}`);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const back = (id) => {
    navigate(`/collections/item/${id}`);
  };

  return (
    <div className="dark:text-white w-full p-10 flex flex-col justify-center items-center">
      <h1 className="text-[30px]">{t("addNewItem")}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[100%] md:w-[50%] bg-gray-400 gap-1 dark:bg-gray-400/20 p-10"
      >
        <label htmlFor="title" className="font-semibold">
          Title:
        </label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="bg-transparent border-b-2 border-black dark:border-white outline-none"
        />
        <label htmlFor="tags" className="mt-2 font-semibold">
          Tags:
        </label>
        <textarea
          name="tags"
          id="tags"
          value={formData.tags}
          required
          onChange={handleInputChange}
          placeholder="#tags"
          rows={1}
          className="bg-transparent border-b-2 border-black dark:border-white outline-none"
        ></textarea>
        {singleCollection?.customFields?.map((field, index) => (
          <div key={index} className="mt-2 flex flex-col w-full">
            <label htmlFor={`customField-${index}`} className="font-semibold">
              {field.name}:
            </label>
            {field.type === "boolean" ? (
              <input
                type="checkbox"
                required
                id={`customField-${index}`}
                checked={formData.customFieldValues[field.name]}
                onChange={(e) =>
                  handleCustomFieldChange(field.name, e.target.checked)
                }
                className="bg-transparent border-b-2 border-black dark:border-white outline-none"
              />
            ) : field.type === "integer" ? (
              <input
                type="number"
                required
                id={`customField-${index}`}
                value={formData.customFieldValues[field.name]}
                onChange={(e) =>
                  handleCustomFieldChange(field.name, e.target.value)
                }
                className="bg-transparent border-b-2 border-black dark:border-white outline-none"
              />
            ) : field.type === "date" ? (
              <input
                type="date"
                id={`customField-${index}`}
                value={formData.customFieldValues[field.name]}
                onChange={(e) =>
                  handleCustomFieldChange(field.name, e.target.value)
                }
                className="bg-transparent border-b-2 border-black dark:border-white outline-none"
              />
            ) : (
              <input
                type="text"
                id={`customField-${index}`}
                value={formData.customFieldValues[field.name]}
                onChange={(e) =>
                  handleCustomFieldChange(field.name, e.target.value)
                }
                className="bg-transparent border-b-2 border-black dark:border-white outline-none"
              />
            )}
          </div>
        ))}
        <div className="flex items-start md:items-center justify-evenly m-2">
          <button
            type="submit"
            className="bg-green-600 px-7 md:px-10 text-white rounded text-lg md:text-[20px]"
          >
            {t("add")}
          </button>
          <button
            className="bg-red-600 text-white px-6 md:px-8 rounded text-lg md:text-[20px]"
            type="button"
            onClick={() => back(singleCollection._id)}
          >
            {t("cancelEdit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;

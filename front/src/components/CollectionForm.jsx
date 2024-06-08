/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CollectionForm({ onCreateCollection, t }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [customFields, setCustomFields] = useState([]);
  const navigate = useNavigate();

  const handleAddCustomField = (type) => {
    const field = { name: "", type: type, value: "" };
    setCustomFields([...customFields, field]);
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCollection(title, description, category, image, customFields);
    setTitle("");
    setDescription("");
    setCategory("");
    setImage("");
    setCustomFields([]);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-6 justify-center m-2 items-center min-h-[50%] md:min-h-[90%]">
      <h1 className=" mt-2 dark:text-white text-[30px]">
        {t("createCollection")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[85%] md:w-[50%] h-[90%] md:h-[90%] gap-3 justify-start flex flex-col flex-wrap bg-[#A0AECD] dark:bg-gray-100/20 p-3 md:p-10 rounded shadow-md"
      >
        <input
          type="text"
          required
          className="bg-transparent dark:text-white outline-none border-b-2 border-black dark:border-white placeholder-black dark:placeholder-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          cols={10}
          value={description}
          required
          className="bg-transparent dark:text-white outline-none border-b-2 border-black dark:border-white placeholder-black dark:placeholder-white"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          className="bg-transparent dark:text-white outline-none border-b-2 border-black dark:border-white placeholder-black dark:placeholder-white"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="file"
          className="bg-transparent dark:text-white outline-none border-b-2 border-black dark:border-white placeholder-black dark:placeholder-white"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <h3 className="dark:text-gray-300 text-[20px] font-semibold">
          Custom Fields
        </h3>
        <div className="flex flex-col">
          <div className="gap-3 flex flex-wrap">
            <button
              className="bg-red-600/10 p-1 rounded dark:text-white"
              type="button"
              onClick={() => handleAddCustomField("integer")}
            >
              Add Integer Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => handleAddCustomField("string")}
            >
              Add String Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => handleAddCustomField("textarea")}
            >
              Add Multiline Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => handleAddCustomField("boolean")}
            >
              Add Boolean Field
            </button>
            <button
              type="button"
              className="bg-red-600/10 p-1 rounded dark:text-white"
              onClick={() => handleAddCustomField("date")}
            >
              Add Date Field
            </button>
          </div>
          {customFields.map((field, index) => (
            <div
              key={index}
              className=" w-full  flex items-center justify-start mt-2"
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
        <div className="flex gap-2 h-[50%]">
          <button
            onClick={() => navigate("/")}
            className="w-full mt-5 bg-gray-50/30 dark:bg-blue-700/30 rounded p-1 dark:text-white font-semibold text[16px] md:text-[20px]"
          >
            {t("home")}
          </button>
          <button
            type="submit"
            className="w-full mt-5 bg-gray-50/30 dark:bg-red-700/30 rounded p-1 dark:text-white font-semibold text[15px] md:text-[20px]"
          >
            {t("create")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CollectionForm;

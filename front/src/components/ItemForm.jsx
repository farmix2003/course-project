/* eslint-disable react/prop-types */
import { useState } from "react";

function ItemForm({ onCreateItem, customFields }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({});

  const handleCustomFieldChange = (field, value) => {
    setCustomFieldValues({ ...customFieldValues, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateItem({
      title,
      author,
      description,
      status,
      tags,
      category,
      image,
      customFields: customFieldValues,
    });
    setTitle("");
    setAuthor("");
    setDescription("");
    setStatus("");
    setTags([]);
    setCategory("");
    setImage("");
    setCustomFieldValues({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value.split(","))}
        placeholder="Tags (comma-separated)"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />
      {customFields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          value={customFieldValues[field.name] || ""}
          onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
          placeholder={field.name}
        />
      ))}
      <button type="submit">Create Item</button>
    </form>
  );
}

export default ItemForm;

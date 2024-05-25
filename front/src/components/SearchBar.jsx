import { Search } from "@mui/icons-material";
import { useState } from "react";
import { getTags } from "../server/server";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      try {
        const response = getTags(value);
        console.log(response);
        setSuggestions(response);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="h-full">
      <div className=" w-[90%] p-[0.5px] md:w-[20rem] sm:p-2 md:p-1 rounded bg-[#A0AECD] md:bg-white dark:bg-gray-500 flex justify-between ">
        <input
          type="text"
          className="outline-none border-none  text-black dark:text-white w-full bg-transparent"
          value={inputValue}
          onChange={handleInputChange}
        />

        <label className="dark:text-white">
          <Search />
        </label>
      </div>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, i) => (
            <li key={i} onChange={() => setInputValue(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

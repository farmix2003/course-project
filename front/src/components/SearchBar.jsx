import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <div className=" w-[10rem] p-[0.5px] md:w-[20rem] md:p-1 rounded bg-white dark:bg-gray-500 flex justify-between ">
      <input
        type="text"
        className="outline-none border-none text-black dark:text-white w-full bg-transparent"
      />

      <Search />
    </div>
  );
};

export default SearchBar;

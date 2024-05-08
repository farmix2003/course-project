import { Delete, Lock, LockOpen } from "@mui/icons-material";

const ToolBar = () => {
  //   const areUsersBlocked = users.every((user) => user.status === "blocked");
  //   console.log(areUsersBlocked);
  return (
    <div className="w-full min-h-[30px] grid md:flex gap-5 my-5">
      <>
        <button className="bg-gray-600 px-[3px] md:ml-0 md:px-3 py-[5px] md:py-1 text-white font-bold rounded">
          <Lock />
        </button>
        <button className="bg-green-700 px-3 py-1 text-white font-bold rounded">
          <LockOpen />
        </button>
        <button className="bg-red-600 px-3 py-1 text-white font-bold rounded">
          <Delete />
        </button>
        <button className=" bg-yellow-500 px-3 py-1 text-white font-bold rounded">
          Add Admin
        </button>
        <button className=" bg-rose-900 px-3 py-1 text-white font-bold rounded">
          Remove Admin
        </button>
      </>
    </div>
  );
};

export default ToolBar;

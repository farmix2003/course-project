import ToolBar from "./ToolBar";

function AdminPanel() {
  // const [selectedUsers, setSelectedUsers] = React.useState([]);
  // const [selectAllUsers, setSelectAllUsers] = React.useState(false);

  // const handleSelectionChange = (userId) => {
  //   const newSelectedUsers = selectedUsers.includes(userId)
  //     ? selectedUsers.filter((id) => id !== userId)
  //     : [...selectedUsers, userId];
  //   setSelectedUsers(newSelectedUsers);
  // };

  // const handleSelectAllUsers = () => {
  //   setSelectedUsers(selectAllUsers ? [] : users.map((user) => user._id));
  //   setSelectAllUsers(!selectAllUsers);
  // };

  // const handleDeleteUser = async () => {
  //   try {
  //     await deleteUser(selectedUsers);
  //     const updatedUsers = users.filter(
  //       (user) => !selectedUsers.includes(user.id)
  //     );
  //     setUsers(updatedUsers);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleBlockUsers = async () => {
  //   try {
  //     await blockUser(selectedUsers);
  //     const updatedUsers = users.map((user) =>
  //       selectedUsers.includes(user.id) ? { ...user, status: "blocked" } : user
  //     );
  //     setUsers(updatedUsers);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleUnblockUser = async () => {
  //   try {
  //     await unblockUser(selectedUsers);
  //     const updatedUsers = users.map((user) =>
  //       selectedUsers.includes(user.id) ? { ...user, status: "active" } : user
  //     );
  //     setUsers(updatedUsers);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const isAdminBlocked = users.find(
  //   (user) => user.email === userInfo && user.status === "blocked"
  // );

  return (
    <div className="bg-gray-600/30 dark:bg-gray-500/30 p-2 mt-10 rounded-md h-[400px] w-[95%] md:w-[80%] ml-[10px] md:ml-[100px]">
      <ToolBar
      // handleDeleteUser={handleDeleteUser}
      // handleBlockUsers={handleBlockUsers}
      // handleUnblockUser={handleUnblockUser}
      // users={users}
      // isAdminBlocked={isAdminBlocked}
      />
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th className="dark:text-gray-400 text-[16px]">ID</th>
            <th className="dark:text-gray-400"> Full Name</th>
            <th className="dark:text-gray-400">Email</th>
            <th className="dark:text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td className="dark:text-white">1</td>
            <td className="dark:text-white">Farrukh</td>
            <td className="dark:text-white">ff@gmail.com</td>
            <td className="dark:text-white">Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default AdminPanel;

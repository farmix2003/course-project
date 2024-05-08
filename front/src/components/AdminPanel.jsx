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
    <div
      style={{ height: 400, width: "80%", marginLeft: "100px" }}
      className="dark:bg-gray-500/30 p-2 mt-10 rounded-md"
    >
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
            <th className="dark:text-gray-400">ID</th>
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

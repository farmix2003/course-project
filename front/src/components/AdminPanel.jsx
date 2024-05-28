/* eslint-disable react/prop-types */
import { useState } from "react";
import ToolBar from "./ToolBar";
import {
  addAdmin,
  blockUsers,
  removeAdmin,
  removeUser,
  unblockUsers,
} from "../server/server";

function AdminPanel({ users, user, setUsers, t }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllUsers, setSelectAllUsers] = useState(false);

  const handleSelectionChange = (userId) => {
    const newSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectAllUsers = () => {
    setSelectedUsers(selectAllUsers ? [] : users.map((user) => user._id));
    setSelectAllUsers(!selectAllUsers);
  };

  const handleDeleteUser = async () => {
    try {
      await removeUser(selectedUsers);
      const updatedUsers = users.filter(
        (user) => !selectedUsers.includes(user.id)
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlockUsers = async () => {
    try {
      await blockUsers(selectedUsers);
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: "blocked" } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnblockUser = async () => {
    try {
      await unblockUsers(selectedUsers);
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: "active" } : user
      );
      setUsers(updatedUsers);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await addAdmin(selectedUsers);
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, role: "admin" } : user
      );
      setUsers(updatedUsers);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      await removeAdmin(selectedUsers);
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id)
          ? { ...user, role: "regular user" }
          : user
      );
      setUsers(updatedUsers);
    } catch (e) {
      console.log(e);
    }
  };

  const isAdminBlocked = users.find(
    (userInfo) => userInfo.email === user && userInfo.status === "blocked"
  );
  const isAdmin = users.find(
    (loggedUser) => loggedUser.role === "admin" && loggedUser.email === user
  );
  return (
    <div className="bg-gray-600/30 dark:bg-gray-500/30 p-3 md:p-2  mt-10 rounded-md min-h-[400px] w-[95%] md:w-[80%] ml-[10px] md:ml-[100px]">
      {isAdmin && (
        <ToolBar
          handleDeleteUser={handleDeleteUser}
          handleBlockUsers={handleBlockUsers}
          handleUnblockUser={handleUnblockUser}
          handleAddAdmin={handleAddAdmin}
          handleRemoveAdmin={handleRemoveAdmin}
          users={users}
          isAdminBlocked={isAdminBlocked}
          t={t}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllUsers}
                onChange={handleSelectAllUsers}
              />
            </th>
            <th className="dark:text-gray-400 text-[16px] hidden md:table-cell">
              ID
            </th>
            <th className="dark:text-gray-400 hidden md:table-cell">
              Username
            </th>
            <th className="dark:text-gray-400 text-[15px] md:text-[17px]">
              Email
            </th>
            <th className="dark:text-gray-400 text-[15px] md:text-[17px]">
              Status
            </th>
            <th className="dark:text-gray-400 text-[15px] md:text-[17px]">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelectionChange(user._id)}
                  />
                </td>
                <td className={`dark:text-white hidden md:table-cell`}>
                  {user._id.slice(5, 8)}
                </td>
                <td className="dark:text-white hidden md:table-cell">
                  {user.username}
                </td>
                <td className="dark:text-white text-[14px] md:text-[16.5px]">
                  {user.email}
                </td>
                <td className="dark:text-white text-[14px] md:text-[16.5px]">
                  {user.status}
                </td>
                <td className="dark:text-white text-[14px] md:text-[16.5px]">
                  {user.role}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminPanel;

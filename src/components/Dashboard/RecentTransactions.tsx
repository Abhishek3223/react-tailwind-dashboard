"use client";

import { FiArrowUpRight, FiEdit, FiMoreHorizontal, FiPlus, FiUsers } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useUserStore } from "../../store/store";


import React, { useState } from "react";
import { AddUserModal } from "./AddUserForm";
import { EditUserModal } from "./EditUserForm";


export const UserList = () => {
  const users = useUserStore((state: any) => state.users);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full px-5">
      <div className="flex  items-center justify-between">
        <h3 className="mb-4 font-medium flex-row w-full text-lg px-4 flex items-center gap-2">
          <FiUsers /> User Management
        </h3>

        <button
          onClick={() => setModalOpen(true)} className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiPlus />
          <span>   Add User</span>
        </button>
      </div>

      <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
        <TableHead />
        <tbody>
          {users.length > 0 ? (
            users.map((user: any, index: number) => (
              <TableRow
                key={user.id}
                userId={user.id}
                name={user.name}
                email={user.email}
                role={user.role || "User"}
                status={user.status || "Active"}
                order={index + 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No users available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Component */}
      {isModalOpen && (
        <AddUserModal
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

const TableHead = () => (
  <thead>
    <tr className="text-sm font-normal text-stone-500 bg-stone-200">
      <th className="text-start p-1.5 border border-gray-300">User ID</th>
      <th className="text-start p-1.5 border border-gray-300">Name</th>
      <th className="text-start p-1.5 border border-gray-300">Email</th>
      <th className="text-start p-1.5 border border-gray-300">Role</th>
      <th className="text-start p-1.5 border border-gray-300">Status</th>
      <th className="text-start p-1.5 border border-gray-300">Actions</th>
    </tr>
  </thead>
);





 const TableRow = ({
  userId,
  name,
  email,
  role,
  status,
  order,
}: {
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  order: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteUser = useUserStore((state) => state.removeUser);

  const toggleEditModal = () => setIsEditing(!isEditing);
  const toggleDeleteConfirm = () => setIsDeleting(!isDeleting);

  const handleDelete = () => {
    deleteUser(userId);
    setIsDeleting(false);
  };

  return (
    <>
      <tr
        className={`text-sm ${order % 2 ? "bg-gray-50" : "bg-white"
          } hover:bg-gray-100 transition-colors`}
      >
        <td className="p-3 border border-gray-300">{userId}</td>
        <td className="p-3 border border-gray-300 text-gray-700">{name}</td>
        <td className="p-3 border border-gray-300 text-gray-600">{email}</td>
        <td className="p-3 border border-gray-300 text-gray-600">{role}</td>
        <td
          className={`p-3 border border-gray-300 ${status === "Active"
            ? "text-green-600"
            : status === "Inactive"
              ? "text-red-600"
              : "text-yellow-600"
            }`}
        >
          {status}
        </td>
        <td className="p-3  flex items-center gap-2">
          <button
            onClick={toggleEditModal}
            className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          >
            <FiEdit className="inline-block" /> Edit
          </button>
          <button
            onClick={toggleDeleteConfirm}
            className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-red-400 px-3 py-1.5 rounded"
          >
            <FiTrash2 className="inline-block" /> Delete
          </button>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditing && (
        <EditUserModal
          userId={userId}
          name={name}
          email={email}
          role={role}
          status={status}
          closeModal={toggleEditModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                onClick={toggleDeleteConfirm}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-700 rounded hover:bg-gray-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-600 font-bold";
    case "Inactive":
      return "text-gray-600 font-bold";
    case "Pending":
      return "text-orange-500 font-bold";
    default:
      return "";
  }
};


"use client";

import { TopBar } from "@/components/Dashboard/TopBar";
import { useUserStore } from "@/store/store"
import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2, FiUsers } from "react-icons/fi";

interface Role {
    id: string;
    name: string;
    permissions: string[];
}

export default function Page() {
    const roles = useUserStore((state: any) => state.users);
    const removeRole = useUserStore((state: any) => state.removeRole);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const deleteUser = useUserStore((state) => state.removeUser);
    const handleDelete = () => {
        deleteUser(user?.id || "");
        setIsDeleting(false);
    };
    const toggleDeleteConfirm = () => setIsDeleting(!isDeleting);
    const openModal = (role?: Role) => {
        setSelectedRole(role || null);
        setModalOpen(true);
    };
    const [user, setUser] = useState<any>()

    const closeModal = () => {
        setSelectedRole(null);
        setModalOpen(false);
    };



    return (
        <div className="bg-white rounded-lg pt-4 pb-4 shadow">
            <TopBar />
            <div className="w-full px-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                        <FiUsers /> Role Management
                    </h3>
                    <button
                        onClick={() => openModal()}
                        className="flex text-sm items-center gap-2 bg-stone-100 hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
                    >
                        <FiPlus />
                        <span>Add Role</span>
                    </button>
                </div>

                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="text-sm font-medium text-stone-500 bg-stone-200">
                            <th className="text-start p-2 border">ID</th>
                            <th className="text-start p-2 border">Name</th>
                            <th className="text-start p-2 border">Permissions</th>
                            <th className="text-start p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles?.length > 0 ? (
                            roles?.map((role: any) => (
                                <tr key={role.id} className="hover:bg-gray-100 transition-colors">
                                    <td className="p-4 border border-gray-300 text-black text-sm">{role.id}</td>
                                    <td className="p-4 border border-gray-300 text-black text-sm font-medium">{role.name}</td>
                                    <td className="p-4 border border-gray-300 text-gray-700 text-sm">
                                        {role.permissions?.length > 0 ? (
                                            <div className="list-disc flex gap-1 pl-5">
                                                {role.permissions?.map((permission: string, index: number) => (
                                                    <p key={index} className="text-sm text-gray-700">{permission}</p>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 italic">No Permissions</span>
                                        )}
                                    </td>

                                    <td className="p-3  flex items-center border-b-1  gap-2">
                                        <button
                                            className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
                                            onClick={() => openModal(role)}
                                        >
                                            <FiEdit className="inline-block" /> Edit
                                        </button>
                                        <button
                                            className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-red-400 px-3 py-1.5 rounded"
                                            onClick={() => {
                                                setUser(role)
                                                toggleDeleteConfirm()

                                            }
                                            }
                                        >
                                            <FiTrash2 className="inline-block" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-4 text-center text-gray-600 font-light bg-gray-50"
                                >
                                    No roles found. Add a new role to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

                {/* Edit Role Modal */}
                {isDeleting && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md shadow w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete ?
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
                {isModalOpen && (
                    <EditRoleModal
                        role={selectedRole}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </div>
    );
}



export const EditRoleModal = ({ role, closeModal }: any) => {
    const [name, setName] = useState(role?.name || "");
    const [permissions, setPermissions] = useState(role?.permissions || []);

    const updateRole = useUserStore((state: any) => state.updatePermissions);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Role name cannot be empty.");
            return;
        }
        updateRole(role.id, permissions);
        closeModal();
    };

    const togglePermission = (permission: string) => {
        setPermissions((prev: any) =>
            prev.includes(permission)
                ? prev.filter((p: any) => p !== permission)
                : [...prev, permission]
        );
    };

    const availablePermissions = ["Read", "Write", "Delete"];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-6 text-black">
                    {role ? "Edit Role" : "Add Role"}
                </h3>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter role name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Permissions
                    </label>
                    <div className="space-y-3">
                        {availablePermissions.map((permission) => (
                            <div key={permission} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={permissions.includes(permission)}
                                    onChange={() => togglePermission(permission)}
                                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-gray-800 text-sm">{permission}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 transition duration-300"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

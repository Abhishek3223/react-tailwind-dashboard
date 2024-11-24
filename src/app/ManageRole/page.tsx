"use client";

import { TopBar } from "@/components/Dashboard/TopBar";
import { useUserStore } from "@/store/store"
import { useEffect, useState } from "react";
import { FiPlus, FiUsers } from "react-icons/fi";

interface Role {
    id: string;
    name: string;
    permissions: string[];
}

export default function Page() {
    const roles = useUserStore((state: any) => state.users);
    const removeRole = useUserStore((state: any) => state.removeRole);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const handleDelete = (roleId: string) => {
        if (confirm("Are you sure you want to delete this role?")) {
            removeRole(roleId);
        }
    };

    const openModal = (role?: Role) => {
        setSelectedRole(role || null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRole(null);
        setModalOpen(false);
    };
    useEffect(() => {
        console.log(localStorage.users);


    }, [])


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
                                <tr key={role.id}>
                                    <td className="p-3 border">{role.id}</td>
                                    <td className="p-3 border">{role.name}</td>
                                    <td className="p-3 border">
                                        {role.permissions?.length > 0 && role.permissions?.join(", ")}
                                    </td>
                                    <td className="p-3 border">
                                        <button
                                            className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
                                            onClick={() => openModal(role)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                            onClick={() => handleDelete(role.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-3 text-center text-gray-500"
                                >
                                    No roles found. Add a new role to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Edit Role Modal */}
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
        console.log(permissions);

    };

    const availablePermissions = ["Read", "Write", "Delete"];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">
                    {role ? "Edit Role" : "Add Role"}
                </h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Role Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Permissions
                    </label>
                    {availablePermissions.map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={permissions.includes(permission)}
                                onChange={() => togglePermission(permission)}
                            />
                            <span>{permission}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

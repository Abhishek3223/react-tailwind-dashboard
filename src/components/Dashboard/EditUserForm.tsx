import { useUserStore } from "@/store/store";

export const EditUserModal = ({
    userId,
    name: initialName,
    email: initialEmail,
    role: initialRole,
    status: initialStatus,
    closeModal,
}: {
    userId: string;
    name: string;
    email: string;
    role: string;
    status: string;
    closeModal: () => void;
}) => {
    const updateUser = useUserStore((state: any) => state.updateUser);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedUser = {
            id: userId,
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            role: formData.get("role") as string,
            status: formData.get("status") as string,
        };
        updateUser(updatedUser);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Edit User</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={initialName}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={initialEmail}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        defaultValue={initialRole}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <select
                        name="status"
                        className="border border-gray-300 p-2 rounded"
                        defaultValue={initialStatus}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-red-400 px-3 py-1.5 rounded"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex text-sm w-[120px] text-center items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

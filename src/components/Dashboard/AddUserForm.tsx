import { useUserStore } from "@/store/store";
import { permission } from "process";

export const AddUserModal = ({ closeModal }: { closeModal: () => void }) => {
    const addUser = useUserStore((state: any) => state.addUser);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newUser = {
        id: Date.now().toString(),
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as string || "User",
        status: formData.get("status") as string || "Active",
        permission:[]
      };
      addUser(newUser);
      closeModal();
      e.currentTarget.reset();
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Add New User</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-800 transition"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
  
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter user name"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
  
            {/* Email Input */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter user email"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
  
            {/* Role Input */}
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Enter user role"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                defaultValue="User"
              />
            </div>
  
            {/* Status Dropdown */}
            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                defaultValue="Active"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
  
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
"use client";

import { create } from "zustand";

interface User {
    id: string;
    name: string;
    email: string;
    role?: string; // Role name or ID
    status?: string; // Active/Inactive
    permissions: string[]; // Permissions assigned to the user
}

interface AppStore {
    users: User[];

    // User Management
    addUser: (newUser: User) => void;
    updateUser: (updatedUser: User) => void;
    removeUser: (userId: string) => void;

    updatePermissions: (userId: string, permissions: string[]) => void;
}

export const useUserStore = create<AppStore>((set) => ({
    // Initialize users from localStorage
    users: JSON.parse(localStorage.getItem("users") || "[]") as User[],

    // Add a new user
    addUser: (newUser: User) => {
        set((state) => {
            const updatedUsers = [...state.users, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
            return { users: updatedUsers };
        });
    },

    // Update an existing user
    updateUser: (updatedUser: User) => {
        set((state) => {
            const updatedUsers = state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
            return { users: updatedUsers };
        });
    },

    // Remove a user by ID
    removeUser: (userId: string) => {
        set((state) => {
            const updatedUsers = state.users.filter((user) => user.id !== userId);
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
            return { users: updatedUsers };
        });
    },

    // Update permissions for a user
    updatePermissions: (userId: string, permissions: string[]) => {
        set((state) => {
            const updatedUsers = state.users.map((user) =>
                user.id === userId ? { ...user, permissions } : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            console.log(localStorage.getItem("users"));
            return { users: updatedUsers };
        });
    },
}));

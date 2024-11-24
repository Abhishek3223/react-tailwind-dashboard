"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { FiHome, FiUsers } from "react-icons/fi";

export const RouteSelect = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="space-y-2">
      <Route
        Icon={FiHome}
        selected={pathname === "/"} // Highlight if the current path is "/"
        title="Dashboard"
        href="/"
      />
      <Route
        Icon={FiUsers}
        selected={pathname === "/ManageRole"} // Highlight if the current path is "/manage-users"
        title="Manage Users"
        href="/ManageRole"
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  href,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <button
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      >
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};

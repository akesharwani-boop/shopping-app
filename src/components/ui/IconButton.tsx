import React from "react";

export default function IconButton({
  onClick,
  children,
  color = "gray",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  color?: "gray" | "red";
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${
        color === "red"
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditUserModal({ user, onClose, onSuccess }: Props) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [error, setError] = useState("");

  const updateUser = async () => {
    if (!name || !email || !role) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.put(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
        { name, email, role }
      );

      onSuccess();
      onClose();
    } catch {
      setError("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>

        {/* 🔴 ERROR MESSAGE YAHI SHOW HOGA */}
        {error && (
          <div className="mb-3 rounded bg-red-100 border border-red-300 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <input
          className={`border p-2 w-full mb-2 ${
            error && !name ? "border-red-500" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={`border p-2 w-full mb-2 ${
            error && !email ? "border-red-500" : ""
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className={`border p-2 w-full mb-4 ${
            error && !role ? "border-red-500" : ""
          }`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={updateUser}>Save</Button>
        </div>
      </div>
    </div>
  );
}

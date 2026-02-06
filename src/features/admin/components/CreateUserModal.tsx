import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateUserModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const createUser = async () => {
    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("https://api.escuelajs.co/api/v1/users", {
        name,
        email,
        password,
        role,
        avatar: "https://picsum.photos/200",
      });

      onSuccess();
      onClose();
    } catch {
      setError("Failed to create user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Create User</h2>

   
        {error && (
          <div className="mb-3 rounded bg-red-100 border border-red-300 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <input
          placeholder="Name"
          className={`border p-2 w-full mb-2 ${
            error && !name ? "border-red-500" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className={`border p-2 w-full mb-2 ${
            error && !email ? "border-red-500" : ""
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className={`border p-2 w-full mb-2 ${
            error && !password ? "border-red-500" : ""
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
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
          <Button onClick={createUser}>Create</Button>
        </div>
      </div>
    </div>
  );
}
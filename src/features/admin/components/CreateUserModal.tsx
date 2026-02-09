import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { userSchema } from "../validation/admin.schema";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateUserModal({ onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "customer",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("https://api.escuelajs.co/api/v1/users", {
          ...values,
          avatar: "https://picsum.photos/200",
        });

        toast.success("User created successfully");
        onSuccess();
        onClose();
      } catch {
        toast.error("Demo API does not allow creating users");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Create User</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            className="border p-2 w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}

          <input
            name="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <select
            name="role"
            className="border p-2 w-full"
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import * as Yup from "yup";

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

const editUserSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required(),
});

export default function EditUserModal({ user, onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    validationSchema: editUserSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://api.escuelajs.co/api/v1/users/${user.id}`,
          values
        );

        toast.success("User updated successfully");
        onSuccess();
        onClose();
      } catch {
        toast.error("Demo API does not allow updating users");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            name="name"
            className="border p-2 w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}

          <input
            name="email"
            className="border p-2 w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

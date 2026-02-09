import { useFormik } from "formik";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { categorySchema } from "../validation/admin.schema";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateCategoryModal({ onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        await axios.post("https://api.escuelajs.co/api/v1/categories", {
          name: values.name,
          image: "https://picsum.photos/200",
        });

        toast.success("Category created successfully");
        onSuccess();
        onClose();
      } catch {
        toast.error("Demo API does not allow category creation");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Create Category</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Category name"
            className="border p-2 w-full rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {formik.errors.name && (
            <p className="text-red-600 text-sm">
              {formik.errors.name}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

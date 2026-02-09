import { useFormik } from "formik";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { categorySchema } from "../validation/admin.schema";

type Props = {
  category: {
    id: number;
    name: string;
  };
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditCategoryModal({
  category,
  onClose,
  onSuccess,
}: Props) {
  const formik = useFormik({
    initialValues: {
      name: category.name,
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://api.escuelajs.co/api/v1/categories/${category.id}`,
          { name: values.name }
        );

        toast.success("Category updated successfully");
        onSuccess();
        onClose();
      } catch {
        toast.error("Demo API does not allow category update");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            name="name"
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
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { productSchema } from "../validation/admin.schema";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateProductModal({ onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      categoryId: "",
      image: "",
      description: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("https://api.escuelajs.co/api/v1/products", {
          title: values.title,
          price: Number(values.price),
          description: values.description,
          categoryId: Number(values.categoryId),
          images: [values.image],
        });

        toast.success("Product created successfully");
        onSuccess();
        onClose();
      } catch {
        toast.error("Demo API does not allow product creation");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Create Product</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Product Title"
            className="w-full border p-2 rounded"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}

          <input
            name="categoryId"
            type="number"
            placeholder="Category ID (eg: 1)"
            className="w-full border p-2 rounded"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          />
          {formik.errors.categoryId && (
            <p className="text-red-500 text-sm">{formik.errors.categoryId}</p>
          )}

          <input
            name="image"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          {formik.errors.image && <p className="text-red-500 text-sm">{formik.errors.image}</p>}

          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            className="w-full border p-2 rounded"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

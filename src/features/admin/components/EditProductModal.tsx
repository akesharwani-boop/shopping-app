import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { productSchema } from "../validation/admin.schema";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditProductModal({ product, onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.images?.[0] || "",
      categoryId: 1, 
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://api.escuelajs.co/api/v1/products/${product.id}`,
          {
            title: values.title,
            price: Number(values.price),
            description: values.description,
            images: [values.image],
          }
        );

        toast.success("Product updated successfully");
        onSuccess();
        onClose();
      } catch {
        toast.error("Demo API does not allow updating products");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
        <h2 className="text-xl font-semibold">Edit Product</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            name="title"
            className="border p-2 w-full rounded"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}

          <input
            name="price"
            type="number"
            className="border p-2 w-full rounded"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}

          <input
            name="image"
            className="border p-2 w-full rounded"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          {formik.errors.image && <p className="text-red-500 text-sm">{formik.errors.image}</p>}

          <textarea
            name="description"
            rows={3}
            className="border p-2 w-full rounded"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

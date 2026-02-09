import * as Yup from "yup";

/* ================= PRODUCT ================= */
export const productSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number().positive().required("Price is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url().required("Image is required"),
  categoryId: Yup.number().required("Category is required"),
});

/* ================= USER ================= */
export const userSchema = Yup.object({
  name: Yup.string().min(2).required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

/* ================= CATEGORY ================= */
export const categorySchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Minimum 2 characters required")
    .required("Category name is required"),
});
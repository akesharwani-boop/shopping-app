import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6).required("Password is Required"),
});

export const signupSchema = Yup.object({
  name: Yup.string().min(2).required("Nmae is Required"),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

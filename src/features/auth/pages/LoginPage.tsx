// import { useFormik } from "formik";
// import { loginSchema } from "../validation/auth.schema";
// import { useLoginMutation } from "../hooks/useAuthMutations";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function LoginPage() {
//   const loginMutation = useLoginMutation();
//   const formik = useFormik({
//     initialValues: { email: " ", password: " " },
//     validationSchema: loginSchema,
//     onSubmit: (values) => loginMutation.mutate(values),
//   });
//   return (
//     <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-4">
//       <Input
//         name="email"
//         placeholder="Email"
//         onChange={formik.handleChange}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email && (
//         <p className="text-sm text-red-500">{formik.errors.email}</p>
//       )}
//       <Input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={formik.handleChange}
//         value={formik.values.password}
//       />
//       {formik.touched.password && formik.errors.password && (
//         <p className="text-sm text-red-500">{formik.errors.password}</p>
//       )}
//       <Button type="submit" disabled={loginMutation.isPending}>
//         Login
//       </Button>
//     </form>
//   );
// }
import { useFormik } from "formik";
import { loginSchema } from "../validation/auth.schema";
import { useLoginMutation } from "../hooks/useAuthMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const loginMutation = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Welcome Back 👋
      </h2>
      <p className="text-white/80 text-center mb-6">
        Login to continue shopping
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* 📧 Email */}
        <div>
          <label className="text-sm text-white/80">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 bg-white/30 border-white/20 text-white placeholder:text-white/60"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-300 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* 🔒 Password */}
        <div>
          <label className="text-sm text-white/80">Password</label>
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 bg-white/30 border-white/20 text-white"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-300 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* 🚀 Submit */}
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-black/80 hover:bg-black text-white">
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {/* ❌ API Error */}
        {loginMutation.isError && (
          <p className="text-center text-red-300 text-sm">
            Invalid email or password
          </p>
        )}

        <p className="text-center text-white/70 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/auth/signup"
            className="underline text-white hover:text-white/90">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

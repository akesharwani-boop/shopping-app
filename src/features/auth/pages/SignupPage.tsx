
import { useFormik } from "formik";
import { signupSchema } from "../validation/auth.schema";
import { useSignupMutation } from "../hooks/useAuthMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";
export default function SignupPage() {
  const signupMutation = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      signupMutation.mutate({
        ...values,
        avatar: "https://i.pravatar.cc/150",
      });
    },
  });

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Create Account ✨
      </h2>
      <p className="text-white/80 text-center mb-6">Join us & start shopping</p>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/*  Name */}
        <div>
          <label className="text-sm text-white/80">Name</label>
          <Input
            name="name"
            placeholder="Your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 bg-white/30 border-white/20 text-white placeholder:text-white/60"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-300 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/*  Email */}
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

        {/*  Password */}
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

        {/*  Submit */}
        <Button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-black/80 hover:bg-black text-white">
          {signupMutation.isPending ? "Creating account..." : "Sign Up"}
        </Button>

        {/*  API Error */}
        {signupMutation.isError && (
          <p className="text-center text-red-300 text-sm">
            Signup failed. Email may already exist.
          </p>
        )}

        <p className="text-center text-white/70 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="underline text-white hover:text-white/90">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

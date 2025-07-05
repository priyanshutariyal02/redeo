"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/notification";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { BsFacebook, BsGoogle } from "react-icons/bs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      console.log("Attempting to sign in with email:", email);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Provide more user-friendly error messages
        let errorMessage = result.error;
        if (result.error.includes("Incorrect password")) {
          errorMessage =
            "The password you entered is incorrect. Please try again.";
        } else if (result.error.includes("Invalid email or password")) {
          errorMessage =
            "No account found with this email address. Please check your email or create a new account.";
        } else if (result.error.includes("Email and password are required")) {
          errorMessage = "Please enter both your email and password.";
        } else if (result.error.includes("Authentication failed")) {
          errorMessage =
            "Login failed. Please check your credentials and try again.";
        }

        setError(errorMessage);
        showNotification(errorMessage, "error");
      } else if (result?.ok) {
        showNotification("Login successful! Welcome back!", "success");
        router.push("/");
      } else {
        console.error("Unexpected sign in result:", result);
        const errorMessage = "Login failed. Please try again.";
        setError(errorMessage);
        showNotification(errorMessage, "error");
      }
    } catch (error) {
      console.error("Login exception:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Login to continue your creative journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                  className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                    error
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                  className={`w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                    error
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 sm:py-3 px-6 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
            {/* Register Link */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-gray-600 text-sm sm:text-base">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full py-2.5 sm:py-3 px-6 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3 text-sm sm:text-base">
              <BsGoogle className="text-lg" />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
            <button className="w-full py-2.5 sm:py-3 px-6 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3 text-sm sm:text-base">
              <BsFacebook className="text-lg" />
              <span className="font-medium text-gray-700">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

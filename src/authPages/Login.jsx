import { useState, useEffect } from "react";
import React from "react";
import API from "./api.js";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 mb-6 shadow-lg shadow-violet-500/20">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-[15px] text-zinc-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 shadow-xl shadow-black/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[13px] font-medium text-zinc-300"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={form.email}
                required
                autoComplete="email"
                className="h-10 bg-zinc-950/60 border-zinc-700/60 text-white placeholder:text-zinc-500 rounded-lg text-sm focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[13px] font-medium text-zinc-300"
                >
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-[13px] text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={form.password}
                required
                autoComplete="current-password"
                className="h-10 bg-zinc-950/60 border-zinc-700/60 text-white placeholder:text-zinc-500 rounded-lg text-sm focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-colors"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-medium text-sm rounded-lg border-0 shadow-md shadow-violet-500/15 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98] mt-1"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[14px] text-zinc-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

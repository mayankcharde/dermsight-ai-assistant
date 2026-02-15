import { useState, useEffect } from "react";
import React from "react";
import API from "./api.js";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-[#0a0a0f] to-rose-950/30" />
      </div>

      {/* Animated Aurora Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.3) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 70%)",
            top: "-20%",
            right: "-10%",
            animation: "aurora1 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)",
            bottom: "-15%",
            left: "-5%",
            animation: "aurora2 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "aurora3 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Register Form Container */}
      <div className="w-full max-w-[420px] mx-auto px-4 py-8 relative z-10">
        <Card className="relative border-0 bg-white/[0.03] backdrop-blur-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Card Glow Border */}
          <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-[1px] rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 pointer-events-none" />

          <CardHeader className="relative space-y-3 text-center pt-12 pb-8">
            {/* Logo with Animated Ring */}
            <div className="relative mx-auto mb-6">
              {/* Outer Ring Animation */}
              <div className="absolute -inset-4 rounded-full">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(16, 185, 129, 0.5), rgba(236, 72, 153, 0.5), rgba(139, 92, 246, 0.5), transparent)",
                    animation: "spin 4s linear infinite",
                  }}
                />
              </div>
              <div className="absolute -inset-4 rounded-full bg-slate-950/80" />

              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-pink-500/30 rounded-2xl blur-xl animate-pulse" />

              {/* Icon Container */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-pink-500 flex items-center justify-center shadow-[0_8px_32px_-4px_rgba(16,185,129,0.5)]">
                <svg
                  className="w-10 h-10 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
            </div>

            <CardTitle className="text-[2.5rem] font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-pink-200 bg-clip-text text-transparent">
                Create Account
              </span>
            </CardTitle>
            <CardDescription className="text-[15px] text-slate-400 pt-3 max-w-xs mx-auto leading-relaxed">
              Join us today and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="relative px-8 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4.5">
              {/* Name Field */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="name"
                  className="text-[13px] font-semibold text-slate-300 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Full Name
                </Label>
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 blur transition-all duration-300 ${focusedField === "name" ? "opacity-50" : "group-hover:opacity-30"}`}
                  />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    value={form.name}
                    required
                    className="relative h-11 bg-slate-900/50 border-slate-700/50 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 rounded-lg text-white placeholder:text-slate-500 text-[15px]"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="email"
                  className="text-[13px] font-semibold text-slate-300 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address
                </Label>
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 blur transition-all duration-300 ${focusedField === "email" ? "opacity-50" : "group-hover:opacity-30"}`}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    value={form.email}
                    required
                    className="relative h-11 bg-slate-900/50 border-slate-700/50 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 rounded-lg text-white placeholder:text-slate-500 text-[15px]"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="password"
                  className="text-[13px] font-semibold text-slate-300 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-violet-400"
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
                  Password
                </Label>
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 blur transition-all duration-300 ${focusedField === "password" ? "opacity-50" : "group-hover:opacity-30"}`}
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    value={form.password}
                    required
                    className="relative h-11 bg-slate-900/50 border-slate-700/50 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 rounded-lg text-white placeholder:text-slate-500 text-[15px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 relative overflow-hidden font-semibold text-[15px] shadow-[0_8px_32px_-8px_rgba(16,185,129,0.5)] transition-all duration-500 mt-6 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-pink-500 hover:from-emerald-400 hover:via-teal-400 hover:to-pink-400 border-0 hover:shadow-[0_16px_48px_-8px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Button Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="relative flex flex-col space-y-5 px-8 pb-12 pt-8">
            {/* Divider */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-r from-transparent via-slate-900 to-transparent px-4 text-[11px] uppercase text-slate-500 tracking-widest font-medium">
                  Have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-[14px] text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold bg-gradient-to-r from-emerald-400 to-pink-400 bg-clip-text text-transparent hover:from-emerald-300 hover:to-pink-300 transition-all duration-300 hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-8 gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
          <div
            className="w-2 h-2 rounded-full bg-teal-500/50 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-pink-500/50 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-5%, 5%) scale(1.1); }
          66% { transform: translate(5%, 2%) scale(0.95); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, -5%) scale(1.05); }
          66% { transform: translate(-5%, -2%) scale(1.1); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Register;

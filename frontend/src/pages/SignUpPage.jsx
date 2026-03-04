import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6"
    >
      {/* Glass Card */}
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl 
        border border-white/20 rounded-2xl shadow-2xl p-8"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl 
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
              flex items-center justify-center shadow-lg"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>
            <p className="text-white/70">
              Get started with your free account 
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name */}
          <div>
            <label className="text-white font-medium">Full Name</label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-3 rounded-xl 
                bg-white/20 text-white placeholder-white/60
                border border-white/30 focus:border-cyan-400 
                focus:ring-2 focus:ring-cyan-400 outline-none
                transition-all duration-300"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-white font-medium">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl 
                bg-white/20 text-white placeholder-white/60
                border border-white/30 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-400 outline-none
                transition-all duration-300"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white font-medium">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl 
                bg-white/20 text-white placeholder-white/60
                border border-white/30 focus:border-purple-400 
                focus:ring-2 focus:ring-purple-400 outline-none
                transition-all duration-300"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white/60 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-green-400 via-blue-500 to-purple-600
            hover:scale-105 hover:shadow-xl
            transition-all duration-300 flex items-center 
            justify-center gap-2"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-300 hover:text-yellow-200 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
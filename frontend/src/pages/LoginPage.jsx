import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6">

      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg 
      rounded-2xl shadow-2xl border border-white/20 p-8">

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl 
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
            flex items-center justify-center shadow-lg">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-white/70">
              Sign in to your account
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-white font-medium">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="email"
                required
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
                required
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

          {/* Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:scale-105 hover:shadow-xl
            transition-all duration-300 flex items-center 
            justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/70">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-300 hover:text-yellow-200 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

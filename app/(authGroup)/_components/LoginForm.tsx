"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      {/* Email Field */}
      <div className="relative">
        <label
          htmlFor="email"
          className="absolute -top-2 left-3 bg-card px-1 text-xs text-muted-foreground z-10"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@gmail.com"
          required
          className="h-12 bg-transparent"
        />
      </div>

      {/* Password Field */}
      <div className="relative">
        <label
          htmlFor="password"
          className="absolute -top-2 left-3 bg-card px-1 text-xs text-muted-foreground z-10"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          required
          className="h-12 bg-transparent pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="h-4 w-4 rounded border-border accent-primary"
        />
        <label htmlFor="remember" className="text-sm text-foreground">
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full h-12 font-medium mt-2"
      >
        {pending ? "Submitting..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
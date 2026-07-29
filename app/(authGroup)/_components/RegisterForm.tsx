"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useState,
  useTransition,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormValues } from "../_schemas/authSchema"
import { registerAction } from "../_actions/authActions"
import { useRouter } from "next/navigation"
import Link from "next/link"

const RegisterForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      role: undefined,
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    startTransition(async () => {
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
      }

      const result = await registerAction(payload)

      if (result?.success) {
        toast.success(result.message || "Account created successfully!")
        router.push("/login")
      } else {
        toast.error(result?.message || "Registration failed")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First & Last Name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingField
          id="firstName"
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <FloatingField
          id="lastName"
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingField
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <FloatingField
          id="phone"
          label="Phone Number"
          placeholder="+1234567890"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      {/* Role Selector */}
      {/* Role Selector */}
      <div className="w-full">
        <div className="relative">
          <label
            htmlFor="role"
            className="absolute -top-2 left-3 z-10 bg-card px-1 text-xs text-muted-foreground"
          >
            I am a
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""} 
              >
                <SelectTrigger
                  id="role"
                  className={`!h-12 w-full bg-transparent ${
                    errors.role ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TENANT">
                    Tenant (Looking for a place)
                  </SelectItem>
                  <SelectItem value="LANDLORD">
                    Landlord (Listing properties)
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {errors.role?.message && (
          <p className="mt-1 ml-1 text-xs text-destructive">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Password */}
      <FloatingField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        error={errors.password?.message}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        }
        {...register("password")}
      />

      {/* Confirm Password */}
      <FloatingField
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        }
        {...register("confirmPassword")}
      />

      {/* Terms */}
      <div className="pt-1">
        <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            {...register("terms")}
            className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
          />
          <span>
            I agree to all the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policies
            </Link>
          </span>
        </label>
        {errors.terms?.message && (
          <p className="mt-1 ml-6 text-xs text-destructive">
            {errors.terms.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="mt-2 h-12 w-full font-medium"
      >
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}

export default RegisterForm

/* ---------- Reusable Floating Input Field ---------- */
interface FloatingFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  rightIcon?: ReactNode
}

const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ label, error, rightIcon, id, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <label
            htmlFor={id}
            className="absolute -top-2 left-3 z-10 bg-card px-1 text-xs text-muted-foreground"
          >
            {label}
          </label>
          <Input
            id={id}
            ref={ref}
            className={`h-12 bg-transparent ${rightIcon ? "pr-10" : ""} ${
              error ? "border-destructive focus-visible:ring-destructive" : ""
            } ${className || ""}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 ml-1 text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)

FloatingField.displayName = "FloatingField"

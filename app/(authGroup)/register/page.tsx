import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-6xl rounded-3xl bg-card p-6 md:p-10 bg-chart-1/10  shadow-lg border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="relative h-[400px] lg:h-[700px] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1634822929277-0c51ca0e8846?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hotel view"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="h-2 w-6 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-white/70"></div>
              <div className="h-2 w-2 rounded-full bg-white/70"></div>
            </div>
          </div>

          <div className="space-y-6 px-2 md:px-6 order-1 lg:order-2">
            {/* Logo */}
            <div className="italic text-2xl font-serif text-primary">
              RentNest
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Sign up</h1>
              <p className="text-sm text-muted-foreground">
                Let&apos;s get you all set up so you can access your personal account.
              </p>
            </div>

            {/* FORM */}
            <RegisterForm />

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
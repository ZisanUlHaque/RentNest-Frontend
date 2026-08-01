import Image from "next/image"
import Link from "next/link"
import LoginForm from "../_components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-6xl rounded-3xl border bg-chart-1/10 p-6 shadow-lg md:p-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6 px-4 md:px-8">
            <Link href={"/"}>
              <div className="font-serif text-2xl text-primary italic">
                RentNest
              </div>
            </Link>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Login</h1>
              <p className="text-sm text-muted-foreground">
                Login to access your RentNest account
              </p>
            </div>

            <LoginForm />

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl lg:h-[600px]">
            <Image
              src="https://i.ibb.co/TD8Z84ZX/premium-photo-1732721750677-b9e410a2c335.avif"
              alt="Hotel view"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
              <div className="h-2 w-6 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-white/70"></div>
              <div className="h-2 w-2 rounded-full bg-white/70"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// app/not-found.tsx

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Big 404 with House Icon */}
        <div className="relative mb-8">
          <h1 className="text-[180px] md:text-[240px] font-black leading-none bg-gradient-to-br from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent select-none">
            404
          </h1>

          {/* Floating House Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center animate-bounce">
              <Home className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Property Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for seems to have moved out.
          Let&apos;s find you a new place to explore!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            
            size="lg"
            className="rounded-xl h-12 px-8 bg-chart-4 hover:bg-chart-3 shadow-lg shadow-blue-200"
          >
            <Link href="/">
              Back to Home
            </Link>
          </Button>

          <Button
        
            variant="outline"
            size="lg"
            className="rounded-xl h-12 px-8 border-2 text-chart-4"
          >
            <Link href="/properties">
              Browse Properties
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
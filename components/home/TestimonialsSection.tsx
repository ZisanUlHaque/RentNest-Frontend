
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  content: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tunde O.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    content:
      "Loft was a breath of fresh air. The apartment was neat, well-furnished, and in a secure area. I stayed for a work trip in Lekki and didn't want to leave. Great value for money!",
    bgColor: "#EDE4FF",
  },
  {
    id: 2,
    name: "Chinelo A.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    content:
      "From check-in to check-out, everything was smooth. The place was so cozy and had this modern vibe. I even hosted a small hangout with friends. Will definitely book again.",
    bgColor: "#FCE7E7",
  },
  {
    id: 3,
    name: "Idris B.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    content:
      "I needed a quiet place to relax and Loft delivered. The location was central, the Wi-Fi was strong, and the host was super responsive. 10/10 experience.",
    bgColor: "#FDF6D9",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-chart-3 text-white px-4 py-2 rounded-lg text-sm font-medium mb-8">
          <span className="text-base leading-none">✦</span>
          Ratings & Reviews
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-20 tracking-tight">
          Real Stories. Real People. Real Loft.
        </h2>

        {/* Cards - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{ backgroundColor: testimonial.bgColor }}
              className={`
                rounded-3xl p-8 pt-16 relative
                transition-all duration-300 hover:-translate-y-2 hover:shadow-lg
                ${index === 0 ? "md:mt-0" : ""}
                ${index === 1 ? "md:mt-20" : ""}
                ${index === 2 ? "md:mt-10" : ""}
              `}
            >
              {/* Avatar - Overlapping top */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-md relative shrink-0 bg-gray-100">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name centered under avatar */}
              <p className="absolute top-8 left-1/2 -translate-x-1/2 translate-x-10 font-bold text-gray-900 whitespace-nowrap">
                {testimonial.name}
              </p>

              {/* Content */}
              <p className="text-gray-700 text-[15px] leading-relaxed mt-4">
                {testimonial.content}
              </p>

              {/* Quote mark bottom-right */}
              <div className="flex justify-end mt-6">
                <span className="text-3xl font-serif text-gray-900 leading-none">
                  &rdquo;&rdquo;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
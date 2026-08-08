import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  content: string;
  borderColor: string; 
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tunde O.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    content: "RentNest was a breath of fresh air. The apartment was neat and in a secure area. I stayed for a work trip and didn't want to leave. Great value!",
    borderColor: "border-purple-200 dark:border-purple-900",
  },
  {
    id: 2,
    name: "Chinelo A.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    content: "From check-in to check-out, everything was smooth. The place was so cozy and had this modern vibe. Will definitely book again.",
    borderColor: "border-pink-200 dark:border-pink-900",
  },
  {
    id: 3,
    name: "Idris B.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    content: "I needed a quiet place to relax and RentNest delivered. The location was central and the host was super responsive. 10/10 experience.",
    borderColor: "border-yellow-200 dark:border-yellow-900",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium mb-8">
          <span className="text-base leading-none">✦</span>
          Ratings & Reviews
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-foreground mb-20 tracking-tight">
          Real Stories. Real People. <span className="text-primary">Real Results.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`
                bg-card border-t-4 ${testimonial.borderColor}
                rounded-3xl p-8 pt-16 relative shadow-sm
                transition-all duration-300 hover:-translate-y-2 hover:shadow-lg
                ${index === 1 ? "md:mt-20" : index === 2 ? "md:mt-10" : "md:mt-0"}
              `}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-background shadow-md relative shrink-0">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                </div>
              </div>

              <p className="absolute top-8 left-1/2 -translate-x-1/2 translate-x-10 font-bold text-foreground whitespace-nowrap">
                {testimonial.name}
              </p>

              <p className="text-muted-foreground text-[15px] leading-relaxed mt-4">
                {testimonial.content}
              </p>

              <div className="flex justify-end mt-6">
                <span className="text-3xl font-serif text-primary opacity-50 leading-none">&rdquo;&rdquo;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
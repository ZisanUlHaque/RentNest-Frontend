// app/(publicGroup)/contact/_components/OurOffices.tsx

const offices = [
  {
    city: "Dhaka",
    lines: ["House 42, Road 11, Block C", "Dhanmondi, Dhaka 1212"],
  },
  {
    city: "Bogura",
    lines: ["Plaza Tower, Uposhohor","Bogura 5800",],
  },
];

export function OurOffices() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
          Our offices
        </h2>

        {/* Offices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div key={office.city} className="space-y-2">
              <h3 className="text-primary font-bold text-lg">{office.city}</h3>
              {office.lines.map((line, idx) => (
                <p key={idx} className="text-gray-700 text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
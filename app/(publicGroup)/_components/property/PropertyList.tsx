import { IProperty } from "@/lib/types";
import { getProperty } from "../../_actions/getProperty";
import { PropertyCard } from "./PropertyCard";

export async function PropertyList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getProperty({ query });

  if (!result.success) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load properties.
      </div>
    );
  }

  const properties: IProperty[] = result.data ?? [];

  if (properties.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-lg">No properties found</p>
        <p className="text-sm">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} post={property} />
        ))}
      </div>
    </div>
  );
}
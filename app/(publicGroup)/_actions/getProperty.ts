"use server"

export const getProperty = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined }
}) => {
  const params = new URLSearchParams()

  if (query) {
    if (query.searchTerm) params.set("searchTerm", query.searchTerm as string)
    if (query.location) params.set("location", query.location as string)
    if (query.type) params.set("categoryId", query.type as string)
    if (query.minPrice) params.set("minRent", query.minPrice as string)
    if (query.maxPrice) params.set("maxRent", query.maxPrice as string)
    if (query.availability) {
      const statusMap: Record<string, string> = {
        available: "AVAILABLE",
        rented: "RENTED",
        pending: "PENDING",
      }
      const mapped = statusMap[(query.availability as string).toLowerCase()]
      if (mapped) params.set("status", mapped)
    }

  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    {
      cache: "no-cache",
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["property"],
      },
    }
  )

  const result = await res.json()
  return result
}
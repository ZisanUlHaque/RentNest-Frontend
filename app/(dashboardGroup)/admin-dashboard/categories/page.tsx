
import { Card } from "@/components/ui/card"
import { FolderTree, Building2 } from "lucide-react"

export default async function AdminCategoriesPage() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "no-store",
  })
  const data = await res.json()
  const categories = data?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">
          {categories.length} categories available
        </p>
      </div>

      {categories.length === 0 ? (
        <Card className="p-20 text-center">
          <FolderTree className="size-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-lg font-semibold">No categories yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat: any) => (
            <Card
              key={cat.id}
              className="p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FolderTree className="size-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg truncate">{cat.name}</p>
                  {cat.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
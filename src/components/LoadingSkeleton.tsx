import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Feed Explorer</h1>
        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-36" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, j) => (
                    <Card key={j} className="overflow-hidden">
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-32 w-full" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-28" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

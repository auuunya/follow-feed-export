import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rss, Clock, ExternalLink } from "lucide-react"
import { FeedDetails } from "../../types/view"

interface FeedDetailsProps {
  feed: FeedDetails
}

export default function FeedCard({ feed }: FeedDetailsProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <div className="flex items-center gap-3">
          <Rss className="w-5 h-5 flex-shrink-0" />
          <CardTitle className="text-lg font-semibold leading-tight">
            {feed.title || "Untitled Feed"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {feed.description || "No description available"}
        </CardDescription>
        {/* <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {new Date(feed.checkedAt).toLocaleDateString()}
          </span>
        </div> */}
        <a
          href={feed.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Visit Site
          <ExternalLink className="w-4 h-4" />
        </a>
      </CardContent>
    </Card>
  )
}
'use client'

import { motion } from "framer-motion"
import { UserFeed } from "../../types/view"
import FeedCard from "./FeedCard"

interface FeedListProps {
  userFeeds: UserFeed[]
}

export default function FeedList({ userFeeds }: FeedListProps) {
  // Sort userFeeds by size (assuming size is a property of the feed)
  const sortedFeeds = userFeeds.sort((a: UserFeed, b: UserFeed) => {
    // const dateA = new Date(a.feeds.checkedAt).getTime(); // Convert to timestamp
    // const dateB = new Date(b.feeds.checkedAt).getTime(); // Convert to timestamp
    return a.view - b.view;
  });
  console.log("sortedFeeds:", sortedFeeds)
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {sortedFeeds.map((userFeed) => (
        <motion.div
          key={userFeed.feedId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <FeedCard feed={userFeed.feeds} />
        </motion.div>
      ))}
    </motion.div>
  )
}
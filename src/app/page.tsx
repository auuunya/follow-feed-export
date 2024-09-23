'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FeedList from "../components/Feed/FeedList"
import { UserFeed, ViewNameList } from "../types/view"
import SearchBar from "../components/SearchBar/SearchBar"
import { Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateOpml } from "../service/explorer"

export default function Home() {
  const [data, setData] = useState<UserFeed[]>([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [views, setViews] = useState<(number | string)[]>([])
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({})
  const [selectedView, setSelectedView] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [filteredData, setFilteredData] = useState<UserFeed[]>([])

  const fetchUserInfo = async (query: string) => {
    const queryUserInfo = `${process.env.NEXT_PUBLIC_API_PROFILE}${query.trim()}`
    const response = await fetch(queryUserInfo)
    if (!response.ok) {
      throw new Error('Failed to fetch user info')
    }
    return response.json()
  }

  const fetchUserSubscriptions = async (userId: string) => {
    const querySubscriptions = `${process.env.NEXT_PUBLIC_API_SUBSCRIPTIONS}${userId}`;
    const response = await fetch(querySubscriptions)
    if (!response.ok) {
      throw new Error('Failed to fetch user subscriptions')
    }
    return response.json()
  }

  const handleSearch = async (query: string) => {
    setLoading(true)
    setError(null)
    setSearchPerformed(true)
    setSelectedView("all")
    setSelectedCategory("all")
    setFilteredData([])

    try {
      const userInfo = await fetchUserInfo(query)

      if (!userInfo.code) {
        const userId = userInfo.data.id
        const subscriptions = await fetchUserSubscriptions(userId)

        if (!subscriptions.code) {
          const subData = subscriptions.data.filter((item: UserFeed) => !item.hasOwnProperty("lists"))
          setData(subData)
          
          // 提取所有的 views 和 categories
          const allViews = Array.from(new Set(subData.map((item: UserFeed) => item.view as string | number)));
          const categoriesByView: { [key: string]: string[] } = {}
          
          allViews.forEach((view) => {
            const viewCategories: string[] = subData
              .filter((item: UserFeed) => item.view === view)
              .map((item: UserFeed) => item.category || "Ungrouped");
          
            categoriesByView[view as string | number] = ["all", ...new Set(viewCategories)];
          });
          
          setViews(allViews as (string | number)[]);
          setCategories(categoriesByView)
          setFilteredData(subData)
        } else {
          setError('No subscriptions found for this user')
        }
      } else {
        setError('User not found')
      }
    } catch (error) {
      console.error("Error fetching search results:", error)
      setError('An error occurred while fetching data')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const opmlString = generateOpml(filteredData||data)
    const blob = new Blob([opmlString], { type: 'application/opml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'exporter_feeds.opml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleViewChange = (value: string) => {
    setSelectedView(value)
    setSelectedCategory("all")
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  useEffect(() => {
    const filtered = data.filter(item => 
      (selectedView === "all" || item.view === Number(selectedView)) &&
      (selectedCategory === "all" || item.category === selectedCategory || (selectedCategory === "Ungrouped" && !item.category))
    )
    setFilteredData(filtered)
  }, [selectedView, selectedCategory, data])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Follow Feed Export</h1>
        
        <div className={`transition-all duration-300 ease-in-out ${searchPerformed && filteredData.length > 0 ? 'mb-8' : 'flex justify-center items-center h-[calc(100vh-200px)]'}`}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center mt-8"
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-red-500 text-center"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence>
          {searchPerformed && !loading && filteredData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 mt-8"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                  <Select value={selectedView} onValueChange={handleViewChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Views</SelectItem>
                      {views.map(view => (
                        <SelectItem key={view} value={`${view}`}>{ViewNameList[view as number]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedView !== "all" && (
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories[selectedView]?.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <Button onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              <FeedList userFeeds={filteredData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Github: <a href="https://github.com/auuunya/follow-feed-export" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-800 dark:hover:text-gray-200">Follow Feed Export</a></p>
        <p>API: https://api.follow.is</p>
        <div className="mt-4 max-w-2xl mx-auto">
          <p className="mb-2"><strong>Disclaimer:</strong> This project is for educational purposes only.</p>
          <p className="mb-2">It is not intended for commercial use or profit.</p>
          <p>The developers of this project are not responsible for any misuse or violation of terms of service of the APIs used.</p>
        </div>
      </footer>
    </div>
  )
}
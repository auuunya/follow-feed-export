import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-8 w-full max-w-3xl mx-auto">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for userId, eg: 57332895133365248"
        className="flex-grow rounded-r-none focus:ring-0 focus:border-blue-500"
      />
      <Button 
        type="submit"
        className="rounded-l-none bg-blue-500 hover:bg-blue-600 text-white font-medium px-8"
      >
        Search
      </Button>
    </form>
  )
}
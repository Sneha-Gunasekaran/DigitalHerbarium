"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoryFilter } from "@/components/category-filter"
import { SpeciesCard } from "@/components/species-card"
import { speciesData } from "@/lib/species-data"
import { Leaf } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSpecies = useMemo(() => {
    return speciesData.filter((species) => {
      // Category filter
      const categoryMatch =
        selectedCategory === "all" || species.category === selectedCategory

      // Search filter (matches Tamil, English, or botanical name)
      const searchLower = searchQuery.toLowerCase()
      const searchMatch =
        !searchQuery ||
        species.englishName.toLowerCase().includes(searchLower) ||
        species.botanicalName.toLowerCase().includes(searchLower) ||
        species.tamilName.toLowerCase().includes(searchLower) ||
        species.description.toLowerCase().includes(searchLower)

      return categoryMatch && searchMatch
    })
  }, [searchQuery, selectedCategory])

  const handleImageSearch = (description: string) => {
    setSearchQuery(description)
    setSelectedCategory("all")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onImageSearch={handleImageSearch}
      />
      
      <HeroSection />
      
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredSpecies.length}</span> species
            {selectedCategory !== "all" && (
              <span> in <span className="font-medium text-primary capitalize">{selectedCategory}</span></span>
            )}
            {searchQuery && (
              <span> matching <span className="font-medium text-primary">{`"${searchQuery}"`}</span></span>
            )}
          </p>
        </div>

        {/* Species Grid */}
        {filteredSpecies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSpecies.map((species) => (
              <SpeciesCard key={species.id} species={species} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Leaf className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">No species found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Try adjusting your search or category filter to find what you are looking for.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-semibold text-foreground">Herbarium AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Preserving botanical knowledge through digital innovation
          </p>
        </div>
      </footer>
    </div>
  )
}

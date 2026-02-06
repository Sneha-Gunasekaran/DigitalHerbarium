"use client"

import React from "react"

import { useState, useRef } from "react"
import { Search, Camera, Leaf, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

interface NavbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onImageSearch: (description: string) => void
}

export function Navbar({ searchQuery, onSearchChange, onImageSearch }: NavbarProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const imageUrl = event.target?.result as string
        setUploadedImage(imageUrl)
        setIsAnalyzing(true)
        
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Simulate finding a plant based on uploaded image
        const plantSuggestions = [
          "Holy Basil", "Neem", "Aloe Vera", "Hibiscus", "Tulasi",
          "Jasmine", "Marigold", "Rose", "Mint", "Lotus"
        ]
        const randomPlant = plantSuggestions[Math.floor(Math.random() * plantSuggestions.length)]
        
        setIsAnalyzing(false)
        setIsCameraOpen(false)
        setUploadedImage(null)
        onImageSearch(randomPlant)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-serif text-xl font-bold text-foreground">Herbarium</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Digital Collection</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search in Tamil, English, or botanical name..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-10 bg-secondary/50 border-border focus:bg-background"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCameraOpen(true)}
                className="shrink-0 bg-secondary/50 hover:bg-secondary"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Search by image</span>
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCameraOpen(true)}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="mt-6 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search species..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 bg-secondary/50"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent"
                      onClick={() => setIsCameraOpen(true)}
                    >
                      <Camera className="h-4 w-4" />
                      Search by Photo
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Camera/Image Upload Dialog */}
      <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Search by Image</DialogTitle>
            <DialogDescription>
              Upload a photo of a plant and our AI will identify it for you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {uploadedImage ? (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded plant"
                  className="h-full w-full object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <div className="text-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                      <p className="mt-2 text-sm text-muted-foreground">Analyzing plant...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 transition-colors hover:bg-secondary/50"
              >
                <Camera className="h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium text-foreground">Click to upload</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

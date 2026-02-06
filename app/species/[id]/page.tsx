"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Home, Leaf, MapPin, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { speciesData } from "@/lib/species-data"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function SpeciesDetailPage() {
  const params = useParams()
  const router = useRouter()
  const species = speciesData.find((s) => s.id === params.id)

  if (!species) {
    notFound()
  }

  const categoryColors: Record<string, string> = {
    leaves: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    flowers: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    herbs: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    trees: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    shrubs: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    climbers: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    medicinal: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg font-bold text-foreground hidden sm:block">Herbarium</span>
            </Link>
            
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
              <img
                src={species.image || "/placeholder.svg"}
                alt={species.englishName}
                className="h-full w-full object-cover"
              />
              <Badge 
                className={`absolute top-4 left-4 ${categoryColors[species.category] || "bg-secondary text-secondary-foreground"}`}
              >
                {species.category}
              </Badge>
            </div>
            
            {/* Quick Facts Card */}
            <Card className="bg-secondary/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-serif">
                  <MapPin className="h-5 w-5 text-primary" />
                  Habitat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{species.habitat}</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Title Section */}
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                {species.englishName}
              </h1>
              <p className="mt-2 text-xl italic text-muted-foreground">{species.botanicalName}</p>
              <p className="mt-1 text-lg text-primary font-medium">{species.tamilName}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{species.fullDescription}</p>
            </div>

            {/* Uses */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-serif">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Uses & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {species.uses.map((use, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {use}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Characteristics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-serif">
                  <Leaf className="h-5 w-5 text-primary" />
                  Characteristics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {species.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Species */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Related Species</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {speciesData
              .filter((s) => s.category === species.category && s.id !== species.id)
              .slice(0, 4)
              .map((relatedSpecies) => (
                <Link
                  key={relatedSpecies.id}
                  href={`/species/${relatedSpecies.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={relatedSpecies.image || "/placeholder.svg"}
                        alt={relatedSpecies.englishName}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                        {relatedSpecies.englishName}
                      </h3>
                      <p className="text-xs text-muted-foreground italic">{relatedSpecies.botanicalName}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-secondary/30 py-8">
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

"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Species } from "@/lib/species-data"
import Link from "next/link"

interface SpeciesCardProps {
  species: Species
}

export function SpeciesCard({ species }: SpeciesCardProps) {
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
    <Link href={`/species/${species.id}`}>
      <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={species.image || "/placeholder.svg"}
            alt={species.englishName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <Badge 
            className={`absolute top-3 left-3 ${categoryColors[species.category] || "bg-secondary text-secondary-foreground"}`}
          >
            {species.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {species.englishName}
              </h3>
              <p className="text-sm italic text-muted-foreground">{species.botanicalName}</p>
            </div>
            <p className="text-xs text-primary/80 font-medium">{species.tamilName}</p>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {species.description}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

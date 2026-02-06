"use client"

import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Plant Identification</span>
        </div>
        
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
          Digital Herbarium
        </h1>
        
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Explore the rich botanical heritage of India. Search over 50 species by Tamil, English, 
          or botanical names, or simply upload a photo.
        </p>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>50+ Species</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span>Multilingual Search</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>AI Image Recognition</span>
          </div>
        </div>
      </div>
    </section>
  )
}

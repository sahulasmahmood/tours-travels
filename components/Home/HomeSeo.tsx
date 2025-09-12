"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function HomeSeo() {
  // Use SEO data for home page
  useSEOMeta({
    pageId: 'home',
    fallback: {
      title: 'Vinushree Tours & Travels - Best Taxi Services in Tamil Nadu',
      description: 'Book reliable taxi services, tour packages, and travel solutions across Tamil Nadu. One-way trips, round trips, airport taxi, and tour packages available 24/7.',
      keywords: 'taxi service tamil nadu, tour packages, airport taxi, vinushree tours, chennai taxi, bangalore taxi, travel services, one way trip, round trip'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}
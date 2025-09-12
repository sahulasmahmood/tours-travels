"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function PackagesPageSeo() {
  // Use SEO data for packages page
  useSEOMeta({
    pageId: 'packages',
    fallback: {
      title: 'Tour Packages Tamil Nadu - Ooty, Kodaikanal, Chennai Tours',
      description: 'Explore our exciting tour packages for Ooty, Kodaikanal, Chennai, and other Tamil Nadu destinations. Complete packages with accommodation and sightseeing.',
      keywords: 'tour packages tamil nadu, ooty tour package, kodaikanal tour, chennai tour, hill station packages, south india tours, travel packages'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}
"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function AboutPageSeo() {
  // Use SEO data for about page
  useSEOMeta({
    pageId: 'about',
    fallback: {
      title: 'About Vinushree Tours & Travels - Your Trusted Travel Partner',
      description: 'Learn about Vinushree Tours & Travels, your trusted travel partner in Tamil Nadu. We provide reliable taxi services, tour packages, and travel solutions since 2020.',
      keywords: 'about vinushree tours, travel company tamil nadu, trusted taxi service, travel partner, company history, reliable transport'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}
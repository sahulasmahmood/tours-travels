"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function TariffPageSeo() {
  // Use SEO data for tariff page
  useSEOMeta({
    pageId: 'tariff',
    fallback: {
      title: 'Taxi Tariff & Pricing - Vinushree Tours & Travels',
      description: 'Check our competitive taxi tariff and pricing for one-way trips, round trips, airport taxi, and hourly packages. Transparent pricing with no hidden charges.',
      keywords: 'taxi tariff, taxi pricing, one way taxi rates, round trip rates, airport taxi charges, hourly package rates, transparent pricing'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}
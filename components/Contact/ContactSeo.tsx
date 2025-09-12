"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function ContactPageSeo() {
  // Use SEO data for contact page
  useSEOMeta({
    pageId: 'contact',
    fallback: {
        title: 'Contact Vinushree Tours & Travels - Book Your Taxi Now',
        description: 'Contact Vinushree Tours & Travels for taxi booking, tour packages, and travel inquiries. Available 24/7 for all your travel needs across Tamil Nadu.',
        keywords: 'contact vinushree tours, taxi booking, travel inquiry, phone number, whatsapp booking, 24/7 service, customer support'
      }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}
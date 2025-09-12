"use client"

import { useEffect } from 'react'
import { useSEO } from '@/components/providers/seo-provider'

interface SEOMetaOptions {
  pageId: string
  fallback?: {
    title?: string
    description?: string
    keywords?: string
  }
}

export function useSEOMeta({ pageId, fallback }: SEOMetaOptions) {
  const { getSEOByPageId, loading } = useSEO()

  const updateMetaTags = (title: string, description: string, keywords: string) => {
    // Update document title
    document.title = title
    
    // Update meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:type', 'website', 'property')
    
    // Update Twitter Card tags
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:card', 'summary_large_image')
  }
  
  useEffect(() => {
    // Set initial values with fallback
    const initialTitle = fallback?.title || 'Vinushree Tours & Travels'
    const initialDesc = fallback?.description || 'Premium travel services in Tamil Nadu'
    const initialKeys = fallback?.keywords || 'travel services, tour packages, taxi booking'
    
    // Always set fallback values first
    updateMetaTags(initialTitle, initialDesc, initialKeys)
    
    // Then update with SEO data when available
    if (!loading) {
      const seoData = getSEOByPageId(pageId)
      if (seoData) {
        updateMetaTags(
          seoData.title,
          seoData.description,
          seoData.keywords
        )
      }
    }
  }, [pageId, loading, getSEOByPageId, fallback])

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let metaTag = document.querySelector(`meta[${attribute}="${name}"]`)
    
    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.setAttribute(attribute, name)
      document.head.appendChild(metaTag)
    }
    
    metaTag.setAttribute('content', content)
  }

  return {
    seoData: getSEOByPageId(pageId),
    loading
  }
}
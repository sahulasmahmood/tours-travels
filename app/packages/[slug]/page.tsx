import { notFound } from 'next/navigation';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PackageDetailClient from "@/components/PackageDetailClient";

interface PageProps {
  params: {
    slug: string;
  };
}

// Fetch single package by slug
async function getPackageBySlug(slug: string) {
  try {
    // Construct absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/packages`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Package fetch failed:', await response.text());
      return null;
    }
    
    const result = await response.json();
    if (!result.success) {
      return null;
    }
    
    // Find package by slug
    const packageData = result.data.find((pkg: any) => pkg.slug === slug);
    return packageData || null;
    
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}

// Generate static params for all packages
export async function generateStaticParams() {
  try {
    // Construct absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/packages`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch packages for static params');
      return [];
    }
    
    const result = await response.json();
    if (!result.success) {
      return [];
    }
    
    return result.data.map((pkg: any) => ({
      slug: pkg.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const packageData = await getPackageBySlug(resolvedParams.slug);
  
  if (!packageData) {
    return {
      title: 'Package Not Found - Vinushree Tours & Travels',
      description: 'The requested tour package could not be found.',
    };
  }

  return {
    title: packageData.seoTitle || `${packageData.title} - Vinushree Tours & Travels`,
    description: packageData.seoDescription || packageData.description,
    keywords: packageData.seoKeywords || `${packageData.title}, Tamil Nadu tour, ${packageData.category}, travel package, Vinushree Tours`,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const packageData = await getPackageBySlug(resolvedParams.slug);

  if (!packageData) {
    notFound();
  }

  // Transform itinerary format for compatibility
  const transformedPackageData = {
    ...packageData,
    itinerary: packageData.itinerary?.map((item: any) => ({
      time: item.title, // Only show the title, no "Day 1 -"
      activity: item.description
    })) || []
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <PackageDetailClient packageData={transformedPackageData} />
      <Footer />
    </div>
  );
}
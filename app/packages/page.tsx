import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import PackagesPageClient from "@/components/PackagesPageClient";
import { PackagesPageSeo } from "@/components/Packages/PackagesSeo";

export const dynamic = 'force-dynamic';

// SEO metadata
export const metadata = {
  title: "Tour Packages - Vinushree Tours & Travels",
  description:
    "Discover amazing tour packages to beautiful destinations. Explore temples, hill stations, beaches, and cultural sites with our customized travel packages.",
  keywords:
    "tour packages, temple tours, hill station packages, beach tours, cultural tours, travel packages",
}; 

// Fetch packages from API
async function getPackages() {
  try {
    // Construct absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/packages`, {
      cache: 'no-store', // Always fetch fresh data
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch packages:', await response.text());
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return []; // Return empty array if API fails
  }
}

export default async function PackagesPageRoute() {
  const packagesData = await getPackages();

  return (
    <div className="min-h-screen">
      <PackagesPageSeo />
      <Navbar />
      <PackagesPageClient packagesData={packagesData || []} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
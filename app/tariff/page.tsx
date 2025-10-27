import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import TariffPageClient from "@/components/TariffPageClient";
import { TariffPageSeo } from "@/components/Tariff/TariffSeo";

export const dynamic = 'force-dynamic';

// SEO metadata
export const metadata = {
  title: "Travel Tariff & Pricing - Vinushree Tours & Travels",
  description:
    "Explore our competitive travel tariff and pricing for one-way trips, round trips, airport taxi, day rentals, hourly packages for all destinations.",
  keywords:
    "travel tariff, taxi pricing, tour package rates, airport taxi fare, day rental rates, travel cost",
}; 

// Fetch tariff data from API
async function getTariffData() {
  try {
    // Construct absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/tariff`, {
      cache: 'no-store', // Always fetch fresh data
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch tariff data:', await response.text());
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching tariff data:', error);
    return [];
  }
}

export default async function TariffPageRoute() {
  const tariffData = await getTariffData();

  return (
    <div className="min-h-screen">
      <TariffPageSeo />
      <Navbar />
      <TariffPageClient tariffData={tariffData || []} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
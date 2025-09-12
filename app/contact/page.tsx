import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Contact } from "@/components/Contact/Contact";
import { ContactPageSeo } from "@/components/Contact/ContactSeo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Dynamic SEO metadata will be handled by the SEO provider
export const metadata = {
  title: "Contact Us - Travel Services | Vinushree Tours & Travels",
  description:
    "Get in touch with Vinushree Tours & Travels for all your travel needs. Book your trip, get quotes, and plan your perfect journey with us.",
  keywords:
    "contact travel services, travel booking, tour package inquiry, travel support, trip planning",
}; 

// Static travel services data
const travelServices = [
  "One-way Trip",
  "Round Trip", 
  "Airport Taxi",
  "Day Rental",
  "Hourly Package",
  "Local Pickup/Drop",
  "Tour Package",
  "Other"
];



export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactPageSeo />
      <Navbar />
      <Contact />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}

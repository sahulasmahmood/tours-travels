// app/page.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CompleteHome from "@/components/Home/CompleteHome";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { HomeSeo } from "@/components/Home/HomeSeo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Vinushree Tours & Travels - Premium Travel Services',
  description: 'Experience premium travel services with Vinushree Tours & Travels. Offering one-way trips, round trips, airport taxi, day rentals, hourly packages, and tour packages.',
  keywords: 'travel services, tour packages, airport taxi, day rental, one way trip, round trip, Vinushree Tours'
};

// Static data for travel services
const staticTravelData = {
  packages: [
    {
      id: 1,
      title: "Chennai to Mahabalipuram",
      description: "Explore the UNESCO World Heritage sites and beautiful beaches",
      image: "/images/mahabalipuram.jpg",
      duration: "1 Day",
      price: "₹2,500",
      featured: true
    },
    {
      id: 2,
      title: "Ooty Hill Station Tour",
      description: "Experience the Queen of Hills with scenic beauty and pleasant weather",
      image: "/images/ooty.jpg",
      duration: "2 Days",
      price: "₹8,500",
      featured: true
    },
    {
      id: 3,
      title: "Kodaikanal Nature Tour",
      description: "Discover the Princess of Hill Stations with lakes and valleys",
      image: "/images/kodaikanal.jpg",
      duration: "2 Days",
      price: "₹7,500",
      featured: true
    }
  ],
  tariff: [
    {
      id: 1,
      service: "One-way Trip",
      description: "Comfortable one-way travel to your destination",
      price: "₹12/km",
      image: "/images/one-way.jpg"
    },
    {
      id: 2,
      service: "Round Trip",
      description: "Complete round trip with waiting time included",
      price: "₹10/km",
      image: "/images/round-trip.jpg"
    },
    {
      id: 3,
      service: "Airport Taxi",
      description: "Reliable airport pickup and drop services",
      price: "₹15/km",
      image: "/images/airport-taxi.jpg"
    },
    {
      id: 4,
      service: "Day Rental",
      description: "Full day vehicle rental for local sightseeing",
      price: "₹2,500/day",
      image: "/images/day-rental.jpg"
    }
  ],
  banners: [
    {
      id: 1,
      title: "Explore Tamil Nadu",
      subtitle: "Your Journey Begins Here",
      image: "/images/banner1.jpg"
    },
    {
      id: 2,
      title: "Comfortable Travel",
      subtitle: "Safe & Reliable Service",
      image: "/images/banner2.jpg"
    }
  ]
};

const staticTestimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Chennai",
    rating: 5,
    comment: "Excellent service! The driver was punctual and the vehicle was very clean and comfortable.",
    image: "/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Coimbatore",
    rating: 5,
    comment: "Had a wonderful trip to Ooty. The team was professional and the pricing was very reasonable.",
    image: "/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Arun Krishnan",
    location: "Madurai",
    rating: 5,
    comment: "Best travel service in Tamil Nadu. Highly recommend for family trips and business travel.",
    image: "/images/testimonial3.jpg"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeSeo />
      <Navbar />
      <CompleteHome />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}

"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PopularRoutes from "@/components/PopularRoutes"

interface PackageItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  duration: string;
  price: string;
  featured?: boolean;
  highlights: string[];
  inclusions: string[];
  category: string;
}

interface PackagesPageClientProps {
  packagesData: PackageItem[];
}

export default function PackagesPageClient({ packagesData }: PackagesPageClientProps) {
  const handleBookPackage = (packageTitle: string) => {
    const message = `Hi, I'm interested in the ${packageTitle} package. Please provide more details and availability.`;
    const whatsappUrl = `https://wa.me/919003782966?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Hero Section with Animated Background */}
      <section className="relative bg-admin-gradient text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/kodaikanal-hill-station.png"
            alt="Tamil Nadu Tourism Packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-admin-gradient/80"></div>
          
          {/* Animated overlay gradients */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-yellow-600/30 via-transparent to-orange-600/30"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 via-transparent to-yellow-500/20"
            animate={{
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              Tour Packages
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Explore Tamil Nadu
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-normal">
                With Our Curated Packages
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover the rich culture, stunning landscapes, and spiritual heritage of Tamil Nadu 
              with our carefully crafted tour packages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/30 to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Popular
              <span className="block text-transparent bg-clip-text bg-admin-gradient">
                Tour Packages
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Choose from our selection of popular destinations and experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {packagesData.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
                  {/* Package Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    <img
                      src={pkg.image || `/kodaikanal-hill-station.png`}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                        pkg.featured 
                          ? 'bg-yellow-500 text-yellow-900' 
                          : 'bg-white/20 text-white border-white/30'
                      } backdrop-blur-sm`}>
                        {pkg.featured ? '⭐ Featured' : pkg.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{pkg.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="mb-3 sm:mb-4 md:mb-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                        {pkg.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">
                        {pkg.price}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{pkg.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Includes:</h4>
                      <div className="text-xs text-gray-600">
                        {pkg.inclusions.join(' • ')}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => handleBookPackage(pkg.title)}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 transition-all duration-300"
                      >
                        Book This Package
                      </Button>
                      <Link
                        href={`/packages/${pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                        className="block text-center text-admin-primary hover:text-admin-secondary transition-colors font-medium text-sm py-2"
                      >
                        View Full Details →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes inside Packages page (after packages grid) */}
      <PopularRoutes title="Popular Routes" description="Frequently booked city-to-city drop taxi routes" />

      {/* Custom Package Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We can create personalized tour packages based on your preferences, budget, and schedule
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('tel:+919003782966', '_blank')}
              className="bg-admin-gradient text-white hover:opacity-90"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call for Custom Package
            </Button>
            <Button
              onClick={() => window.open('https://wa.me/919003782966?text=Hi, I need a custom tour package. Please help me plan my trip.', '_blank')}
              variant="outline"
              className="border-admin-primary text-admin-primary hover:bg-admin-gradient hover:text-white"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
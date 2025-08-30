"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Phone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import PopularRoutes from "@/components/PopularRoutes"

interface TariffItem {
  id: number;
  service: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  minCharge: string;
}

interface TariffPageClientProps {
  tariffData: TariffItem[];
}

export default function TariffPageClient({ tariffData }: TariffPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleBookNow = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Hero Section with Animated Background */}
      <section className="relative bg-admin-gradient text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/luxury-taxi-service-in-tamil-nadu.png"
            alt="Luxury Taxi Service"
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
              <Car className="h-4 w-4 mr-2" />
              Travel Tariff & Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transparent Pricing
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-normal">
                For All Your Travel Needs
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover our competitive rates for travel services across Tamil Nadu. 
              No hidden charges, just honest pricing for quality service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tariff Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/30 to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Our Service
              <span className="block text-transparent bg-clip-text bg-admin-gradient">
                Tariff
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Choose from our range of travel services with transparent pricing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {tariffData.map((tariff, index) => (
              <motion.div
                key={tariff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          tariff.service.includes('One-way') ? '/toyota-etios-sedan-taxi.png' :
                          tariff.service.includes('Round') ? '/toyota-innova-taxi.png' :
                          tariff.service.includes('Airport') ? '/airport-taxi.png' :
                          tariff.service.includes('Day') ? '/maruti-brezza-suv-taxi.png' :
                          tariff.service.includes('Hourly') ? '/wagon-r-taxi.png' :
                          tariff.service.includes('Local') ? '/modern-taxi-fleet-in-tamil-nadu.png' :
                          '/toyota-innova-crysta-luxury-taxi.png'
                        }
                        alt={tariff.service}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                          {tariff.price}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="text-center mb-4 sm:mb-6 md:mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {tariff.service}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tariff.description}
                        </p>
                      </div>

                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-2">
                          {tariff.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Minimum: {tariff.minCharge}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {tariff.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleBookNow(tariff.service)}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 transition-all duration-300"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes inside Tariff page (before contact section) */}
      <PopularRoutes title="Popular Routes" description="Book your drop taxi quickly from these top routes" />

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us for personalized pricing based on your specific travel requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('tel:+919003782966', '_blank')}
              className="bg-admin-gradient text-white hover:opacity-90"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button
              onClick={() => window.open('https://wa.me/919003782966?text=Hi, I need a custom quote for travel services', '_blank')}
              variant="outline"
              className="border-admin-primary text-admin-primary hover:bg-admin-gradient hover:text-white"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={selectedService}
      />
    </>
  );
}
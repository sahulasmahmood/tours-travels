"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

type PopularRoutesProps = {
  title?: string
  description?: string
  routes?: string[]
  className?: string
}

const DEFAULT_ROUTES: string[] = [
  "Madurai Drop Taxi",
  "Chennai Drop Taxi",
  "Coimbatore Drop Taxi",
  "Cuddalore Drop Taxi",
  "Dindigul Drop Taxi",
  "Erode Drop Taxi",
  "Kanchipuram Drop Taxi",
  "Kanyakumari Drop Taxi",
  "Krishnagiri Drop Taxi",
  "Mayiladuthurai Drop Taxi",
  "Nagapattinam Drop Taxi",
  "Namakkal Drop Taxi",
  "Nilgiris Drop Taxi",
  "Perambalur Drop Taxi",
  "Pudukkottai Drop Taxi",
  "Ramanathapuram Drop Taxi",
  "Salem Drop Taxi",
  "Sivaganga Drop Taxi",
  "TenKasi Drop Taxi",
  "Thanjavur Drop Taxi",
  "Theni Drop Taxi",
  "Thoothukudi Drop Taxi",
  "Tiruchirappalli Drop Taxi",
  "Tirunelveli Drop Taxi",
  "Tiruppur Drop Taxi",
  "Tiruvallur Drop Taxi",
  "Virudhunagar Drop Taxi",
]

export default function PopularRoutes({
  title = "Popular Routes",
  description = "Quick access to our frequently booked routes across Tamil Nadu",
  routes = DEFAULT_ROUTES,
  className,
}: PopularRoutesProps) {
  return (
    <section className={cn("py-12 sm:py-16 md:py-20 bg-white", className)}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="text-left sm:text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-admin-gradient text-white px-4 py-1.5">Popular Routes</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Pills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {routes.map((label, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.02 }}
            >
              <Link href="/#quick-book-form" className="block w-full" aria-label={`${label} - Book now`}>
                <div
                  className={cn(
                    "w-full rounded-full border px-4 py-3 text-sm font-medium",
                    "text-gray-800 border-orange-400 hover:bg-yellow-400 hover:text-gray-900",
                    "bg-white shadow-sm hover:shadow transition-colors",
                  )}
                >
                  {label}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

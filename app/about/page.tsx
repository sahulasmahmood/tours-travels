"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Award,
  Users,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
  Star,
  Building,
  MapPin,
  Car,
  Heart,
  Compass,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactButtons from "@/components/FloatingContactButtons"
import { AboutPageSeo } from "@/components/About/AboutSeo"
import { useBanner } from "@/hooks/use-banner"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
}

export default function AboutPage() {
  const { banner } = useBanner("about")

  const whyVinushree = [
    {
      icon: <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Trusted Experience",
      description:
        "Years of experience providing reliable travel services across Tamil Nadu with thousands of satisfied customers.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Heart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Customer First",
      description:
        "Your comfort and satisfaction are our top priorities. We go the extra mile to ensure memorable travel experiences.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Safe & Secure",
      description: "Well-maintained vehicles, experienced drivers, and comprehensive insurance for your peace of mind.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Punctual Service",
      description: "Always on time, every time. We value your schedule and ensure timely pickups and drop-offs.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <Car className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Modern Fleet",
      description: "Clean, comfortable, and well-maintained vehicles equipped with modern amenities for your journey.",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      icon: <MapPin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Local Expertise",
      description:
        "Deep knowledge of destinations, routes, and hidden gems for the best travel experience.",
      gradient: "from-teal-500 to-green-600",
    },
  ]

  const values = [
    {
      title: "Customer Satisfaction",
      description:
        "We prioritize your comfort and happiness, ensuring every journey exceeds your expectations and creates lasting memories.",
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Trust & Reliability",
      description:
        "Honest pricing, transparent communication, and dependable service form the foundation of our customer relationships.",
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Safety First",
      description:
        "Your safety is our top priority with well-maintained vehicles, experienced drivers, and comprehensive safety measures.",
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Travel Excellence",
      description:
        "We strive to provide exceptional travel experiences that showcase the beauty and culture of Tamil Nadu.",
      icon: <Compass className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ]

  const stats = [
    { number: "1000+", label: "Happy Travelers", icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { number: "500+", label: "Trips Completed", icon: <Car className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { number: "50+", label: "Destinations Covered", icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { number: "99%", label: "Customer Satisfaction", icon: <Heart className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ]

  return (
    <div className="min-h-screen">
      <AboutPageSeo />
      <Navbar />

      {/* Hero Section */}
  <section className="relative bg-admin-gradient text-white py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <img
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.jpg"}
                alt={banner?.title || "Tamil Nadu Tourism"}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent" />
            
            {/* Admin Gradient Layer */}
            <div className="absolute inset-0 bg-admin-gradient/20" />
            
            {/* Animated Gradient Layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 via-transparent to-orange-600/20"
              animate={{
                opacity: [0.2, 0.4, 0.2],
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
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              About Vinushree Tours & Travels
            </Badge>

            {/* Optional dynamic banner title (keeps existing main heading) */}
            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Your Trusted Travel Partner
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1 sm:mt-2 font-normal">
                For All Destinations
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Discover the story behind our commitment to providing exceptional travel experiences to
              beautiful destinations with comfort, safety, and personalized service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 h-full">
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 bg-admin-gradient rounded-xl flex items-center justify-center">
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium text-xs sm:text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section id="story" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Travel Excellence
                <span className="block text-transparent bg-clip-text bg-admin-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  For Every Journey
                </span>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Vinushree Tours & Travels was founded with a vision to make travel comfortable,
                  safe, and memorable. Our journey began with a commitment to providing reliable transportation services
                  that connect people to rich cultural heritage and natural beauty of various destinations.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Today, we are a trusted travel partner offering comprehensive services including one-way trips, round
                  trips, airport taxi, day rentals, hourly packages, and customized tour packages. Our commitment to
                  excellence has earned us the trust of thousands of satisfied customers.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1 sm:mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600 font-medium text-xs sm:text-sm">Happy Travelers</div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-1 sm:mb-2">
                    50+
                  </div>
                  <div className="text-gray-600 font-medium text-xs sm:text-sm">Destinations</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-admin-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Building className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                    Vinushree Tours & Travels
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                    Your Trusted Travel Partner
                  </p>
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">5.0 Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Our Foundation
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              The Principles That
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Guide Our Work</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              The core values and vision that define our commitment to excellence and innovation
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Target className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />,
                title: "Our Mission",
                description:
                  "To provide safe, comfortable, and reliable travel services that connect people to rich heritage, natural beauty, and cultural treasures with exceptional customer care.",
                gradient: "from-blue-500 to-purple-600",
              },
              {
                icon: <Award className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />,
                title: "Our Vision",
                description:
                  "To be the most trusted travel partner, recognized for our commitment to safety, customer satisfaction, and creating unforgettable travel experiences.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: <Heart className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />,
                title: "Our Values",
                description:
                  "Safety, reliability, customer satisfaction, and integrity are the core values that guide everything we do, ensuring memorable travel experiences for every customer.",
                gradient: "from-green-500 to-teal-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="sm:col-span-2 lg:col-span-1 last:sm:col-start-1 last:sm:col-span-2 last:lg:col-span-1 last:lg:col-start-auto"
              >
                <Card className="card-hover h-full border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center relative">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-hover h-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-admin-gradient rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <div className="text-white">{value.icon}</div>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Vinushree Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-yellow-50/50"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Vinushree Tours?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Discover what sets us apart and makes us the preferred choice for travel services
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whyVinushree.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-hover h-full border-0 shadow-xl overflow-hidden group">
                  <CardContent className="p-6 sm:p-8 relative">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${item.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Our Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Experienced Team
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Behind Every Journey</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Meet our dedicated team of travel professionals who ensure your journey is safe, comfortable, and
              memorable
            </p>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-transparent bg-clip-text bg-admin-gradient">
                      Travel Excellence Team
                    </h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
                      Our team consists of experienced drivers, travel coordinators, and customer service professionals
                      dedicated to making your travel experience exceptional. Each team member brings local expertise
                      and a commitment to your safety and satisfaction.
                    </p>
                    <div className="grid gap-3 sm:gap-4">
                      {[
                        "Licensed & Experienced Drivers",
                        "Local Area Expertise",
                        "24/7 Customer Support",
                        "Safety-Focused Approach",
                        "Customer-Centric Service",
                        "Reliable & Punctual Service",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm sm:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-admin-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                      <Users className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                      Travel Professionals
                    </h4>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      Working together to deliver exceptional travel experiences
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm">
                        <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">
                          10+
                        </div>
                        <div className="text-gray-600">Drivers</div>
                      </div>
                      <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm">
                        <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">
                          5+
                        </div>
                        <div className="text-gray-600">Support Staff</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  )
}

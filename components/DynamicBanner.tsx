"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BannerData {
  _id: string;
  pageName: string;
  image: string;
}

export default function DynamicBanner({ pageName }: { pageName: string }) {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`/api/banner?pageName=${pageName}`);
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setBanner(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, [pageName]);

  if (!banner) return null;

  return (
    <div className="w-full relative aspect-[21/9] md:aspect-[3/1]">
      <Image
        src={banner.image}
        alt={`${pageName} banner`}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}

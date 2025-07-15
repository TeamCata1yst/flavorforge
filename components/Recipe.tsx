"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  name: string;
  img?: string;
  info: {
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  time: string;
};

export default function Recipe({ name, info, img, time }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(img || null);
  const [isLoading, setIsLoading] = useState<boolean>(!img);

  useEffect(() => {
    // If no image is provided, fetch one from Unsplash
    if (!img) {
      fetchUnsplashImage();
    }
  }, [img, name]);

  const fetchUnsplashImage = async () => {
    try {
      setIsLoading(true);
      const query = `${name} food`;
      const response = await fetch(
        `/api/unsplash?query=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image from Unsplash");
      }

      const data = await response.json();
      setImageUrl(data.image);
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      // Use a fallback image if Unsplash fetch fails
      setImageUrl(
        "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=500&auto=format&fit=crop",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`/recipe/${name.toLowerCase().split(" ").join("-")}`}
      className="border-2 border-primary/40 bg-background p-3 space-y-2 text-center h-full transition-all flex flex-col relative rounded-lg group hover:shadow-primary/20 cursor-pointer hover:shadow-lg"
    >
      <span className="text-lg font-montserrat">{name}</span>
      <div className="relative h-48 w-full rounded-md overflow-hidden">
        {isLoading ? (
          <div className="h-48 w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-500">Loading image...</span>
          </div>
        ) : (
          <img
            src={imageUrl || ""}
            alt={name}
            className="h-48 w-full rounded-md object-cover"
          />
        )}
      </div>
      <span className="text-sm">Time to cook: {time}</span>
    </Link>
  );
}

"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faDna,
  faDroplet,
  faWheatAlt,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  slug: string;
};

export default function PageComponent({ slug }: Props) {
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [recipeData, setRecipeData] = useState<object>(null);

  useEffect(() => {
    // First, fetch an image from our Unsplash API endpoint for faster loading
    fetch(`/api/unsplash?query=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.image) {
          setImage(data.image);
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });

    // Then fetch the complete recipe data
    fetch(`/api/recipe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: slug,
        ingredients: "",
        dietRestriction: "",
        dietPreference: "",
        spiceLevel: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Only update the image if we didn't already set it or if it's different
        if (!image && data.image) {
          setImage(data.image);
        }
        setVideo(data.video);
        setRecipe(data.recipe);
        setLoading(false);
      });
  }, [slug, image]);

  useEffect(() => {
    if (!recipe) return;
    console.log(recipe);
    try {
      recipeJson = JSON.parse(recipe);
      console.log(recipeJson);
    } catch {
      const match =
        recipe.match(/```json\s*([\s\S]*?)```/i) ||
        recipe.match(/```\s*([\s\S]*?)```/i);
      if (match) {
        try {
          recipeJson = JSON.parse(match[1]);
        } catch {
          console.error("Failed to parse Gemini JSON");
        }
      } else {
        console.error("Failed to parse Gemini JSON");
      }
    }
  }, [recipe]);

  return (
    <main className="min-h-screen overflow-y-scroll overflow-x-hidden bg-background text-text font-open">
      <Navbar />
      {loading ? (
        <div className="rounded-full h-16 w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-t-primary border-gray-300 animate-spin"></div>
      ) : (
        <section className="md:px-24 px-4 py-12 z-10 relative">
          {image && (
            <img className="w-full h-80 object-cover rounded-lg" src={image} />
          )}
          <h1 className="font-montserrat font-semibold capitalize text-3xl p-4">
            {slug.split("-").join(" ")}
          </h1>
          <div className="flex md:flex-row flex-col gap-8">
            <div className="px-4 w-3/5 h-full">
              <h1 className="font-monserrat text-2xl font-semibold">
                Nutritional Information
              </h1>

              <div className="flex flex-wrap gap-6 justify-center flex-1 py-5">
                <div className="border-2 border-primary/50 rounded-lg p-6 flex flex-col justify-center items-center flex-1">
                  <div className="bg-primary/10 p-4 rounded-full mb-3">
                    <FontAwesomeIcon
                      icon={faBoltLightning}
                      className="w-12 h-12 text-primary"
                    />
                  </div>
                  <p className="font-semibold text-primary text-xl">Energy</p>
                  <span className="text-text font-normal text-lg">100kcal</span>
                </div>
                <div className="border-2 border-primary/50 rounded-lg p-6 flex flex-col justify-center items-center flex-1">
                  <div className="bg-primary/10 p-4 rounded-full mb-3">
                    <FontAwesomeIcon
                      icon={faDna}
                      className="w-12 h-12 text-primary"
                    />
                  </div>
                  <p className="font-semibold text-primary text-xl">Protein</p>
                  <span className="text-text font-normal text-lg">40g</span>
                </div>
                <div className="border-2 border-primary/50 rounded-lg p-6 flex flex-col justify-center items-center flex-1">
                  <div className="bg-primary/10 p-4 rounded-full mb-3">
                    <FontAwesomeIcon
                      icon={faWheatAlt}
                      className="w-12 h-12 text-primary"
                    />
                  </div>
                  <p className="font-semibold text-primary text-xl">Carbs</p>
                  <span className="text-text font-normal text-lg">100g</span>
                </div>
                <div className="border-2 border-primary/50 rounded-lg p-6 flex flex-col justify-center items-center flex-1">
                  <div className="bg-primary/10 p-4 rounded-full mb-3">
                    <FontAwesomeIcon
                      icon={faDroplet}
                      className="w-12 h-12 text-primary"
                    />
                  </div>
                  <p className="font-semibold text-primary text-xl">Fats</p>
                  <span className="text-text font-normal text-lg">10g</span>
                </div>
              </div>

              <h1 className="font-monserrat text-2xl font-semibold">
                Ingredients
              </h1>
              <ul className="list-disc list-inside">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            {video && (
              <iframe
                className="w-2/5 h-96 rounded-lg"
                src={video}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

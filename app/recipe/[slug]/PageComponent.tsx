"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "markdown-to-jsx";
import {
	faBoltLightning,
	faDna,
	faDroplet,
	faWheatAlt,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
	slug: string;
};

export default function pageComponent({ slug }: Props) {
	const [image, setImage] = useState<string>("");
	const [video, setVideo] = useState<string>("");
	const [recipe, setRecipe] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
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
				setImage(data.image);
				setVideo(data.video);
				setRecipe(data.recipe);
				setLoading(false);
			});
	}, [slug]);
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
					<p className="px-4 prose">
						<Markdown>{recipe}</Markdown>
					</p>
					<div className="grid md:grid-cols-2 gap-8 py-4">
						{video && (
							<iframe
								className="w-full h-96 rounded-lg"
								src={video}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						)}
						<div className="border-2 border-primary/50 rounded-xl md:p-8 p-4 w-full ">
							<h1 className="font-monserrat text-center text-xl font-semibold mb-4">
								Nutritional Information
							</h1>
							<div className="grid gap-4">
								<p className="flex gap-3 items-center font-semibold text-primary">
									<FontAwesomeIcon icon={faBoltLightning} className="w-6 h-6" />{" "}
									Energy
									<span className="text-text font-normal">100kcal</span>
								</p>
								<p className="flex gap-3 items-center font-semibold text-primary">
									<FontAwesomeIcon icon={faDna} className="w-6 h-6" /> Protein
									<span className="text-text font-normal">40g</span>
								</p>
								<p className="flex gap-3 items-center font-semibold text-primary">
									<FontAwesomeIcon icon={faWheatAlt} className="w-6 h-6" />{" "}
									Carbs
									<span className="text-text font-normal">100g</span>
								</p>
								<p className="flex gap-3 items-center font-semibold text-primary">
									<FontAwesomeIcon icon={faDroplet} className="w-6 h-6" /> Fats
									<span className="text-text font-normal">10g</span>
								</p>
							</div>
						</div>
					</div>
				</section>
			)}
		</main>
	);
}

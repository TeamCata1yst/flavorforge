"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

type Props = {
	slug: string;
};

export default function pageComponent({ slug }: Props) {
	const [image, setImage] = useState<string>("");
	const [video, setVideo] = useState<string>("");
	useEffect(() => {
		fetch(`/api/recipe/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query: slug }),
		})
			.then((res) => res.json())
			.then((data) => {
				setImage(data.image);
				setVideo(data.video);
			});
	}, [slug]);
	return (
		<main className="min-h-screen overflow-y-scroll overflow-x-hidden bg-background text-text font-open">
			<Navbar />
			<section className="md:px-24 px-4 py-12 z-10 relative">
				{image && (
					<img className="w-full h-80 object-cover rounded-lg" src={image} />
				)}
				<h1 className="font-montserrat font-semibold text-3xl p-4">
					Egg Sandwich
				</h1>
				<p className="px-4">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
					repudiandae exercitationem consectetur quos. Voluptate, quam! Fugiat
					adipisci nihil commodi, dolore laborum expedita veniam itaque enim,
					beatae, animi natus consectetur vel.
				</p>
				{video && (
					<iframe
						className="w-full h-96 rounded-lg my-4"
						src={video}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				)}
				<div className="border-2 border-primary/50 rounded-xl p-4"></div>
			</section>
		</main>
	);
}

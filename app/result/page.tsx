import React from "react";
import Navbar from "@/components/Navbar";
import Recipe from "@/components/Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export default function page() {
	return (
		<main className="min-h-screen overflow-y-scroll overflow-x-hidden bg-background text-text font-open">
			<Navbar />
			<section className="md:px-24 px-4 py-12 z-10 relative md:pt-32">
				<div className="grid md:grid-cols-4 gap-5 w-full">
					<Recipe
						name="Bread Omelette"
						time="2 hrs"
						img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIhAxbAD-nJx9nHpRwSxjEcgaDFiN_6OtoQ&s"
						info={{ kcal: 200, protein: 20, fat: 10, carbs: 30 }}
					/>
					<Recipe
						name="Bread Omelette"
						time="2 hrs"
						img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIhAxbAD-nJx9nHpRwSxjEcgaDFiN_6OtoQ&s"
						info={{ kcal: 200, protein: 20, fat: 10, carbs: 30 }}
					/>
					<Recipe
						name="Bread Omelette"
						time="2 hrs"
						img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIhAxbAD-nJx9nHpRwSxjEcgaDFiN_6OtoQ&s"
						info={{ kcal: 200, protein: 20, fat: 10, carbs: 30 }}
					/>
					<Recipe
						name="Bread Omelette"
						time="2 hrs"
						img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIhAxbAD-nJx9nHpRwSxjEcgaDFiN_6OtoQ&s"
						info={{ kcal: 200, protein: 20, fat: 10, carbs: 30 }}
					/>
				</div>
			</section>
			<button className="bg-secondary mx-auto px-8 py-4 font-montserrat font-semibold items-center justify-center rounded-lg text-background border-b-2 cursor-pointer transition-all border-b-accent hover:border-b-0 hover:border-t-2 flex gap-2">
				<FontAwesomeIcon icon={faRefresh} className="w-5 h-5" size="lg" />
				<span>Generate More Recipes!</span>
			</button>
		</main>
	);
}

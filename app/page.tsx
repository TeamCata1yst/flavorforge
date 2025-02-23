import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCookieBite,
	faClock,
	faMoon,
	faSun,
	faIceCream,
	faDna,
	faEgg,
	faLeaf,
	faCarrot,
	faScaleUnbalancedFlip,
	faScaleUnbalanced,
	faBowlFood,
	faFire,
	faPepperHot,
	faDroplet,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function page() {
	return (
		<main className="min-h-screen overflow-y-scroll overflow-x-hidden bg-background text-text font-open">
			<Navbar />
			<section className="grid md:grid-cols-2 gap-8 md:px-24 px-4 py-12 z-10 relative md:pt-32">
				<div className="flex flex-col gap-8 md:order-0 order-1">
					<div className="rounded-lg border-2 border-primary/40 bg-background p-3 h-full flex flex-col relative">
						<span className="absolute font-medium -top-7 left-3">
							Add Ingredients
						</span>
						<div className="space-x-4">
							{[
								"Chicken",
								"Egg",
								"Tofu",
								"Tomato",
								"Rice",
								"Onion",
								"Garlic",
								"Milk",
								"Cheese",
								"Flour",
								"Pasta",
								"Olive Oil",
								"Ghee",
							].map((ingredient, i) => (
								<label key={i} className="inline-flex items-center">
									<input
										type="checkbox"
										name="ingredients"
										value={ingredient}
										className="hidden peer"
									/>
									<span className="cursor-pointer flex items-center px-4 py-2 mb-3 bg-primary/30 text-text/80 rounded-md hover:bg-primary/50 hover:text-text peer-checked:bg-primary/70 transition-all">
										{ingredient}
										<FontAwesomeIcon icon={faPlus} className="w-3 h-3 ml-2" />
									</span>
								</label>
							))}
						</div>
						<textarea
							name=""
							placeholder="Add your own ingredients... (separated by commas)"
							id=""
							className="w-full outline-none rounded-xl p-2 h-full"
						></textarea>
					</div>
					<button className="bg-secondary px-8 py-4 font-montserrat font-semibold rounded-lg text-background border-b-2 cursor-pointer transition-all border-b-accent hover:border-b-0 hover:border-t-2">
						<span>Generate Recipe!</span>
					</button>
				</div>

				<div className="badge h-36 w-36 rotate-12 font-semibold font-montserrat text-sm text-white rounded-full absolute md:top-16 -top-12 md:right-12 right-0 z-40 flex items-center justify-center text-center">
					Your Flavors,
					<br /> Our Way!
				</div>

				<div className="rounded-lg border-2 border-primary/40 bg-background p-4 space-x-4 relative">
					<span className="absolute font-medium -top-7 left-3">
						Select Filters
					</span>
					<p className="text-sm mb-2">Category</p>
					<div className="space-x-4">
						{[
							{ name: "Breakfast", icon: faSun },
							{ name: "Lunch", icon: faClock },
							{ name: "Dinner", icon: faMoon },
							{ name: "Snack", icon: faCookieBite },
							{ name: "Dessert", icon: faIceCream },
						].map((a, i) => (
							<label key={i} className="inline-flex items-center">
								<input
									type="radio"
									name="category"
									value={a.name}
									className="hidden peer"
								/>
								<span className="cursor-pointer flex items-center px-4 py-2 mb-3 bg-primary/30 text-text/80 rounded-md hover:bg-primary/50 hover:text-text peer-checked:bg-primary/70 transition-all">
									<FontAwesomeIcon icon={a.icon} className="mr-2 w-4 h-4" />
									{a.name}
								</span>
							</label>
						))}
					</div>

					<p className="text-sm mb-2">Diet Restrictions</p>
					<div className="space-x-4">
						{[
							{ name: "Eggless", icon: faEgg },
							{ name: "Vegetarian", icon: faCarrot },
							{ name: "Vegan", icon: faLeaf },
						].map((a, i) => (
							<label key={i} className="inline-flex items-center">
								<input
									type="radio"
									name="restriction"
									value={a.name}
									className="hidden peer"
								/>
								<span className="cursor-pointer flex items-center px-4 py-2 mb-3 bg-primary/30 text-text/80 rounded-md hover:bg-primary/50 hover:text-text peer-checked:bg-primary/70 transition-all">
									<FontAwesomeIcon icon={a.icon} className="mr-2 w-4 h-4" />
									{a.name}
								</span>
							</label>
						))}
					</div>

					<p className="text-sm mb-2">Diet Preferences</p>
					<div className="space-x-4">
						{[
							{ name: "High Protein", icon: faDna },
							{ name: "Low Carbs", icon: faScaleUnbalanced },
							{ name: "High Carbs", icon: faScaleUnbalancedFlip },
							{ name: "High Fiber", icon: faBowlFood },
						].map((a, i) => (
							<label key={i} className="inline-flex items-center">
								<input
									type="radio"
									name="preference"
									value={a.name}
									className="hidden peer"
								/>
								<span className="cursor-pointer flex items-center px-4 py-2 mb-3 bg-primary/30 text-text/80 rounded-md hover:bg-primary/50 hover:text-text peer-checked:bg-primary/70 transition-all">
									<FontAwesomeIcon icon={a.icon} className="mr-2 w-4 h-4" />
									{a.name}
								</span>
							</label>
						))}
					</div>

					<p className="text-sm mb-2">Spice Tolerance</p>
					<div className="space-x-4">
						{[
							{ name: "Spicy", icon: faFire },
							{ name: "Mild Spicy", icon: faPepperHot },
							{ name: "Low Spicy", icon: faDroplet },
						].map((a, i) => (
							<label key={i} className="inline-flex items-center">
								<input
									type="radio"
									name="tolerance"
									value={a.name}
									className="hidden peer"
								/>
								<span className="cursor-pointer flex items-center px-4 py-2 mb-3 bg-primary/30 text-text/80 rounded-md hover:bg-primary/50 hover:text-text peer-checked:bg-primary/70 transition-all">
									<FontAwesomeIcon icon={a.icon} className="mr-2 w-4 h-4" />
									{a.name}
								</span>
							</label>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

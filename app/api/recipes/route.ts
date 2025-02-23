import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generateRecipes(
	category: string,
	ingredients: string,
	dietRestriction: string,
	dietPreference: string,
	spiceLevel: string
) {
	const prompt = `Generate 4 ${category} recipes with these conditions:
                    - Ingredients: ${ingredients}
                    - Diet Restriction: ${dietRestriction}
                    - Diet Preference: ${dietPreference}
                    - Spice Level: ${spiceLevel}
                    Strictly return only a JSON array in this format:
                    [{"name": "Recipe Name", "ingredients": "ing1, ing2", "nutrition": {"calories": 100, "protein": 10, "fat": 5, "carbs": 20}}]`;

	try {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
			}
		);

		const data = await response.json();

		if (!data.candidates || !data.candidates[0].content.parts) {
			throw new Error("Invalid API Response");
		}

		const resultText = data.candidates[0].content.parts[0].text;
		console.log("API Response Text:", resultText);

		let recipes;
		try {
			const jsonMatch = resultText.match(/\[.*\]/s);
			if (!jsonMatch) throw new Error("AI response is not in JSON format");
			recipes = JSON.parse(jsonMatch[0]);
		} catch (jsonError) {
			throw new Error("Error parsing JSON response from AI");
		}
		return recipes;
	} catch (error) {
		console.error("Gemini API Error:", error);
		return;
	}
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	const category = body.category;
	const ingredients = body.ingredients;
	const dietRestriction = body.dietRestriction;
	const dietPreference = body.dietPreference;
	const spiceLevel = body.spiceLevel;

	const recipes = await generateRecipes(
		category,
		ingredients,
		dietRestriction,
		dietPreference,
		spiceLevel
	);

	return NextResponse.json(recipes);

	const res = await fetch(
		`https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
	);
	const data = await res.json();
}

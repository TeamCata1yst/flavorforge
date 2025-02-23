import { NextResponse, NextRequest } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
	const body = await req.json();
	const query = body.query;
	const ingredients = body.ingredients;
	const dietRestriction = body.dietRestriction;
	const dietPreference = body.dietPreference;
	const spiceLevel = body.spiceLevel;
	var videoUrl = null;
	const res = await fetch(
		`https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
	);
	const data = await res.json();

	async function genRecipe(
		query: string,
		ingredients: string,
		dietPreference: string,
		dietRestriction: string,
		spiceLevel: string
	) {
		try {
			const prompt = `Generate a recipe for ${query} with these conditions:
											- Ingredients: ${ingredients}
											- Diet Restriction: ${dietRestriction}
											- Diet Preference: ${dietPreference}
											- Spice Level: ${spiceLevel}
											generate in this format: {recipe: 'lorem ipsum dolor', nutrition: {calories: 100, protein: 10, fat: 5, carbs: 20}}
											`;
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
				}
			);

			const data = await response.json();
			console.log("API Response Text:", data);
			if (!data.candidates || !data.candidates[0].content.parts) {
				throw new Error("Invalid API Response");
			}

			const resultText = data.candidates[0].content.parts[0].text;
			return resultText;
		} catch (error) {
			console.error("Gemini API Error:", error);
			return;
		}
	}

	try {
		const q = `${query} recipe`;
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
				q
			)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
		);
		const data = await response.json();

		if (data.items && data.items.length > 0) {
			const videoId = data.items[0].id.videoId;
			videoUrl = `https://www.youtube.com/embed/${videoId}`;
		} else {
			return null;
		}
	} catch (error) {
		console.error("YouTube API Error:", error);
		return null;
	}

	return NextResponse.json({
		image: data.results[0].urls.regular,
		video: videoUrl,
		recipe: await genRecipe(
			query,
			ingredients,
			dietPreference,
			dietRestriction,
			spiceLevel
		),
		nutrition: {
			calories: 100,
			protein: 10,
			fat: 5,
			carbs: 20,
		},
	});
}

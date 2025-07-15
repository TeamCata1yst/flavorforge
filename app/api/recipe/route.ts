import { NextResponse, NextRequest } from "next/server";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = body.query;
  var videoUrl = null;
  // Use our internal Unsplash API endpoint instead of direct API calls
  const res = await fetch(
    `http://localhost:3000/api/unsplash?query=${encodeURIComponent(query)}`,
  );
  const data = await res.json();

  async function genRecipe(query: string) {
    try {
      const prompt = `You are an expert cook. Generate a recipe in JSON format for ${query}. The JSON should have this structure: {recipe: 'lorem ipsum dolor', nutrition: {calories: 100, protein: 10, fat: 5, carbs: 20}}, ingredients: [{name: 'ingredient name', quantity: 'ingredient quantity'}]. Respond ONLY with the JSON object.
											`;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        },
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
        q,
      )}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`,
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
    image: data.image,
    video: videoUrl,
    recipe: await genRecipe(query),
    nutrition: {
      calories: 100,
      protein: 10,
      fat: 5,
      carbs: 20,
    },
  });
}

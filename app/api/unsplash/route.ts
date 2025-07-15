import { NextResponse, NextRequest } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          "Accept-Version": "v1",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Unsplash API returned status: ${res.status}`);
    }

    const data = await res.json();

    // Check if we have results
    if (data.results && data.results.length > 0) {
      return NextResponse.json({ image: data.results[0].urls.regular });
    } else {
      // Return a default image if no results
      return NextResponse.json({
        image:
          "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=500&auto=format&fit=crop",
      });
    }
  } catch (error) {
    console.error("Unsplash API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image from Unsplash" },
      { status: 500 },
    );
  }
}

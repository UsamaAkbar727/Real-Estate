import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call Express Backend API
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, interest, message }),
    });

    if (!backendRes.ok) {
      throw new Error("Backend submission failed");
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Inquiry Proxy Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Inquiry could not be processed" },
      { status: 500 }
    );
  }
}

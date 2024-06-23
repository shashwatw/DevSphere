import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB-V08FJ0ojP5WqgJUHZMzbEKJreIvO4sc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const prompt = `Please provide a comprehensive explanation of ${question} with beautiful formatting enclosing code inside <pre><code></code></pre>`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
};

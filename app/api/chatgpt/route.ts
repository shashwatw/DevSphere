import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const prompt = `Tell me ${question} according to TINYMCE editor and enclose code inside <pre><code></code></pre>`;
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

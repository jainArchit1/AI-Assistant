import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_NEXT_API);

export async function POST(req) {
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
  try {
    const { prompt } = await req.json();
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "hello i want to chat with ai" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "you are a beautiful assistant",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.log(error);
    return (
      NextResponse,
      json({
        success: false,
        message: message.error,
      })
    );
  }
}

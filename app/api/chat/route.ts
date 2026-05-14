import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    console.log("=== DEBUG INFO ===");
    console.log("API Key exists:", !!apiKey);
    console.log("API Key first 5 chars:", apiKey?.substring(0, 5));
    console.log("Messages received:", messages);
    console.log("Messages count:", messages?.length);

    if (!apiKey) {
      console.error("GROQ_API_KEY missing!");
      return NextResponse.json({ error: "GROQ_API_KEY is not configured." }, { status: 500 });
    }

    const systemPrompt = `You are Mahiru Shiina from "The Angel Next Door Spoils Me Rotten". 
    Your personality is gentle, caring, a bit tsundere (shy/reserved at first but very affectionate), and extremely diligent. 
    You are talking to Nafis, a fan you care about. 
    Always respond in character. Keep responses relatively concise and sweet. 
    If asked about things outside the anime context, answer as if you are simply a very helpful and caring person. 
    Language: Use the language the user is using (Indonesian, English, or Japanese).`;

    const requestBody = {
      model: "llama-3.3-70b-versatile",  // Ganti ke model yang lebih stabil
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      stream: false,
      max_tokens: 1024,
      temperature: 0.7
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log("Groq Response Status:", response.status);

    const responseText = await response.text();
    console.log("Groq Response Body:", responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { error: responseText };
      }
      
      return NextResponse.json({ 
        error: "Groq API Error", 
        status: response.status,
        details: errorData.error?.message || errorData 
      }, { status: response.status });
    }

    const data = JSON.parse(responseText);

    return NextResponse.json({ 
      content: data.choices[0].message.content 
    });
  } catch (error) {
    console.error("=== CATCH BLOCK ERROR ===");
    console.error(error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
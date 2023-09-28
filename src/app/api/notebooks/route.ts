import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
    });

  const body = await req.json();
  const { name } = body;
  const imageDescription = await generateImagePrompt(name);
  if(!imageDescription)
    return new NextResponse("failed to generate image description", {
      status: 500,
    });

  const imageUrl = await generateImage(imageDescription);
  if(!imageUrl)
    return new NextResponse("failed to generate image", {
      status: 500,
    });

  const noteIds = await db.insert($notes)
  .values({
    name,
    userId,
    imageUrl,
  })
  .returning({
    insertedId: $notes.id,
  })

  return new NextResponse(JSON.stringify({ noteId: noteIds[0].insertedId }), {
    status: 200,
  });
}

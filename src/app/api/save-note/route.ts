import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { noteId, editorContent } = body;

    if (!noteId || !editorContent)
      return new NextResponse("missing noteId or editorContent", {
        status: 400,
      });

    const notes = await db.select().from($notes).where(
      eq($notes.id, noteId)
    );
    if (notes.length !== 1)
      return new NextResponse("note not found", {
        status: 404,
      });

    const note = notes[0];
    if (note.editorState === editorContent)
      return new NextResponse("no change", {
        status: 200,
      });

    await db.update($notes).set({
      editorState: editorContent,
    }).where(
      eq($notes.id, noteId)
    );

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../schemas/issueSchema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

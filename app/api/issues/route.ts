import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issueSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(255),
  description: z.string().min(1, "Description must be at least 1 character"),
});

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

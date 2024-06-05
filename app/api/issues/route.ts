import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../schemas/issueSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  // 1. Get the session, if the user is not authenticated return an error
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Get the body of the request
  const body = await request.json();

  // 3. Validate the body of the request, if it's not valid return an error
  const validation = issueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({ error: validation.error.errors }, { status: 400 });

  const { title, description } = validation.data;

  // 4. Create a new issue and return it
  const newIssue = await prisma.issue.create({ data: { title, description } });
  return NextResponse.json(newIssue, { status: 201 });
}

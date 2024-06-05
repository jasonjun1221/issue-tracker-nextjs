import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/schemas/issueSchema";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  // 1. Get the session, if the user is not authenticated return an error
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Get the body of the request
  const body = await request.json();

  // 3. Validate the body of the request, if it's not valid return an error
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({ errors: validation.error }, { status: 400 });

  const { title, description, assignedToUserId } = validation.data;

  // 4. Check if the assignedToUserId is valid, if it's not return an error
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
    if (!user) return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  // 5. Find the issue by the id, if it doesn't exist return an error
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // 6. Update the issue with the new data, and return the updated issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  // 1. Get the session, if the user is not authenticated return an error
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Find the issue by the id, if it doesn't exist return an error
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // 3. Delete the issue and return a success message
  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({ success: true });
}

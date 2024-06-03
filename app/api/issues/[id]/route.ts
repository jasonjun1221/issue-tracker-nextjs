import { issueSchema } from "@/app/schemas/issueSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ errors: validation.error }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({ success: true });
}
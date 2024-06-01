import prisma from "@/prisma/db";
import delay from "delay";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  await delay(2000);

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}

import prisma from "@/prisma/db";
import { Pagination } from "@/app/components";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import IssueTable, { columnsNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
  // ["OPEN", "CLOSED", "IN_PROGRESS"]
  const statuses = Object.values(Status);
  // status is one of ["OPEN", "CLOSED", "IN_PROGRESS"], if not, undefined
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  // orderBy is one of ["title", "status", "createdAt"], if not, undefined
  const orderBy = columnsNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;

  // get page number from query params, default to 1
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View all project issues and their statuses.",
};
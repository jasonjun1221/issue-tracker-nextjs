"use client";

import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data, error, isPending } = useUsers();

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  if (isPending) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <>
      <Select.Root onValueChange={assignIssue} defaultValue={issue.assignedToUserId || "unassigned"}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {data?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

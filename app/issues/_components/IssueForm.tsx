"use client";

import { TextField, Button, Callout, Spinner } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueFormData, issueSchema } from "@/app/schemas/issueSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Issue } from "@prisma/client";
import axios from "axios";

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        const response = await axios.put(`/api/issues/${issue.id}`, data);

        if (!response.data) {
          setError("An error occurred while updating the issue.");
          return;
        }
      } else {
        const response = await axios.post("/api/issues", data);

        if (!response.data) {
          setError("An error occurred while creating the issue.");
          return;
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred. Please try again.");
    }
    router.push("/issues");
    router.refresh();
  };

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" defaultValue={issue?.title} {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

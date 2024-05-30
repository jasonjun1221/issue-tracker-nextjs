"use client";

import { TextField, Button, Callout } from "@radix-ui/themes";
import { CiCircleInfo } from "react-icons/ci";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (errors) {
        setError("An error occurred while submitting the form.");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    router.push("/issues");
  };

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

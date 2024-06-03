import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import delay from "delay";

// This is a dynamic import of the IssueForm component
const IssueForm = dynamic(() => import("../../issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function NewIssuePage() {
  return <IssueForm />;
}

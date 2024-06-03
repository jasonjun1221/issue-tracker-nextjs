import { Box, Skeleton } from "@radix-ui/themes";

export default function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton mb="2" height='2rem'/>
      <Skeleton height="20rem" />
    </Box>
  )
}
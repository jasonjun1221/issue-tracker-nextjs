import { Box, Skeleton } from "@radix-ui/themes";

export default function LoadingNewIssuePage() {
  return (
    <Box className="max-w-xl">
      <Skeleton my="2" />
      <Skeleton height="20rem" />
    </Box>
  );
}

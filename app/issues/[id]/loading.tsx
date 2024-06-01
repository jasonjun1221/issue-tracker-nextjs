import { Box, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";

export default function LoadingIssueDetailsPage() {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Text>
          <Skeleton my="2" />
          <Skeleton my="2" />
          <Skeleton my="2" />
        </Text>
      </Card>
    </Box>
  );
}

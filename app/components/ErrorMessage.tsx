import { Text } from "@radix-ui/themes";

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  if (!children) return null;

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
}

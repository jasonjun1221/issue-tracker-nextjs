"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

export default function Navbar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <IoBug />
            </Link>
            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const AuthStatus = () => {
  const { status, data } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated") return <Link className="nav-link" href="/api/auth/signin">Log in</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar src={data!.user!.image!} fallback="?" size="2" radius="full" className="cursor-pointer" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{data!.user!.name}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className={currentPath === href ? "text-gray-900" : "nav-link"}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

export default function Navbar() {
  const currentPath = usePathname();
  const { status, data } = useSession();

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <IoBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={classNames({
                      "text-gray-900": currentPath === href,
                      "text-gray-500": currentPath !== href,
                      "hover:text-gray-800 transition-colors": true,
                    })}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
            {status === "unauthenticated" && <Link href="/api/auth/signin">Log in</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

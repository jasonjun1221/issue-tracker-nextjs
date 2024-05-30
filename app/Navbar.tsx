"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import classNames from "classnames";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
    </nav>
  );
}

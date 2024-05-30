import Link from "next/link";
import { IoBug } from "react-icons/io5";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

export default function Navbar() {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <IoBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-gray-500 hover:text-gray-800 transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

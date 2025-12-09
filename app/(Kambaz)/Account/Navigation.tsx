"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const pathname = usePathname();
  
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <Nav
      id="wd-account-navigation"
      variant="pills"
      className="flex-column fs-5"
    >
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.toLowerCase().endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser && currentUser.role === "ADMIN" && (
        <NavItem key="Users">
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname.toLowerCase().endsWith("users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}

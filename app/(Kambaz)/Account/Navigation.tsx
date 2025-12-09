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
  const pathname = usePathname().toLowerCase();

  const isAuthPage =
    pathname.startsWith("/account/signin") ||
    pathname.startsWith("/account/signup") ||
    pathname === "/account"; 

  const links = !currentUser || isAuthPage ? ["Signin", "Signup"] : ["Profile"];

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
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser && currentUser.role === "ADMIN" && !isAuthPage && (
        <NavItem key="Users">
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname.endsWith("users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

type CurrentUser = {
  role?: string;
} | null;

interface AccountState {
  currentUser: CurrentUser;
}

interface RootState {
  accountReducer: AccountState;
}

export default function AccountNavigation() {
  const pathname = usePathname();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  return (
    <Nav id="wd-account-navigation" variant="pills" className="flex-column fs-5">
      
      <NavLink
        as={Link}
        href="/Account/Signin"
        active={pathname.endsWith("Signin")}
      >
        Signin
      </NavLink>

      <NavLink
        as={Link}
        href="/Account/Signup"
        active={pathname.endsWith("Signup")}
      >
        Signup
      </NavLink>

      <NavLink
        as={Link}
        href="/Account/Profile"
        active={pathname.endsWith("Profile")}
      >
        Profile
      </NavLink>

      {currentUser && currentUser.role === "ADMIN" && (
        <NavLink
          as={Link}
          href="/Account/Users"
          active={pathname.endsWith("Users")}
        >
          Users
        </NavLink>
      )}
    </Nav>
  );
}

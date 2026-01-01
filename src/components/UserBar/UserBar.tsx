"use client";

import Link from "next/link";
import { useAppSelector } from "lib/hooks/react-redux-hooks";
import {
  getIsLoggedIn,
  getUserEmail,
  getUserName,
} from "lib/redux/features/auth/authSelectors";

export default function UserBar() {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const userName = useAppSelector(getUserName);
  const email = useAppSelector(getUserEmail);

  return (
    <>
      {isLoggedIn ? (
        <h4>{userName ? (userName as string) : (email as string)}</h4>
      ) : (
        <p>
          <Link href="/user/signup">Sign Up</Link>
          <span> / </span>
          <Link href="/user/signin">Sign in</Link>
        </p>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useMeQuery, useLogoutMutation } from "@/lib/api/features/authApi";

export default function UserBar() {
  const { data: authResponse, isLoading, isError } = useMeQuery();
  const [logout] = useLogoutMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // 401 Unauthorized or other errors (e.g., network issues) will be treated as not authenticated
  if (isError || !authResponse) {
    return (
      <p>
        <Link href="/user/signup">Sign Up</Link>
        <span> / </span>
        <Link href="/user/signin">Sign in</Link>
      </p>
    );
  }

  // Authenticated user view
  return (
    <div className="flex items-center gap-x-1">
      {authResponse.avatarUrl && (
        <Image
          className="w-8 h-8 rounded-full object-cover"
          src={authResponse.avatarUrl}
          alt="avatar"
          width={32}
          height={32}
        />
      )}

      <h4>{authResponse.user.username ?? authResponse.user.email}</h4>

      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("user/signin");
  });

  return (
    <div className="container mx-auto">
      <h2>User&apos;s page, need to redirect to signin or signup</h2>
    </div>
  );
}

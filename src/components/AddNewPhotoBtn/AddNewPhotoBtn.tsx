"use client";

import Link from "next/link";
import { useAppSelector } from "lib/hooks/react-redux-hooks";
import { UserRoles } from "types/user";
import { getIsLoggedIn, getUser } from "lib/redux/features/auth/authSelectors";
import { usePathname } from "next/navigation";

export default function AddNewPhotoBtn() {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const userRole = useAppSelector(getUser).role;
  const currentPath = usePathname();

  return isLoggedIn &&
    userRole === UserRoles.Admin &&
    currentPath !== "/images/add-new" ? (
    <div className="w-full flex justify-center sm:justify-end px-4 sm:px-0">
      <Link
        type="bottom"
        href="/images/add-new"
        className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors"
      >
        Add New Photo
      </Link>
    </div>
  ) : null;
}

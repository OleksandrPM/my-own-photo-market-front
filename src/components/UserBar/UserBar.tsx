import Link from "next/link";

export default function UserBar() {
  return (
    <>
      <p>
        <Link href="/user/signup">Sign Up</Link>
        <span> / </span>
        <Link href="/user/signin">Sign in</Link>
      </p>
    </>
  );
}

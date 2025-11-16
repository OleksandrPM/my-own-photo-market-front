import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="container mx-auto">
      <h2>SignUp Page</h2>
      <p>
        Already have an account? In that case, go to the{" "}
        <Link href="/user/signin">Sign In</Link> page.
      </p>
    </div>
  );
}

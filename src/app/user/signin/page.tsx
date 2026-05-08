import Link from "next/link";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="container mx-auto text-center">
      <h2 className="content-center">SignIn Page</h2>
      <p>
        Don&apos;t have an account yet?{" "}
        <Link href="/user/signup" className="text-blue-500 hover:underline">
          Create an account
        </Link>
      </p>
      <SignInForm />
    </div>
  );
}

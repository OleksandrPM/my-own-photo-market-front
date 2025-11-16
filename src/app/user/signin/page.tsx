import SignInForm from "components/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="container mx-auto">
      <h2 className="content-center">SignIn Page</h2>
      <p>
        Don't have an account yet?{" "}
        <Link href="/user/signup">Create an account</Link>
      </p>
      <SignInForm />
    </div>
  );
}

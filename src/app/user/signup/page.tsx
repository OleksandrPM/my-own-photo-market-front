"use client";

import { useState } from "react";
import Link from "next/link";
import { useCheckSetupEnabledQuery } from "@/lib/api/features/setupApi";
import SetupDialog from "@/components/SetupDialog";
import SetupForm from "@/components/SetupForm";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  const { data: isEnabled, isLoading, isError } = useCheckSetupEnabledQuery();
  const [shouldSetup, setShouldSetup] = useState<boolean | null>(null);

  const handleSetupChoice = (choice: boolean) => {
    setShouldSetup(choice);
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error checking setup status</p>;
  } else if (isEnabled === true) {
    if (shouldSetup === null) {
      content = <SetupDialog getChoice={handleSetupChoice} />;
    } else if (shouldSetup === true) {
      content = <SetupForm />;
    } else {
      // shouldSetup === false
      content = <SignUpForm />;
    }
  } else {
    // isEnabled === false
    content = <SignUpForm />;
  }

  return (
    <div className="container mx-auto text-center">
      <h2>SignUp Page</h2>

      {content}

      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/user/signin" className="text-blue-500 hover:underline">
          Log in here
        </Link>
        .
      </p>
    </div>
  );
}

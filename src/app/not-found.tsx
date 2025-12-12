import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto">
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>{" "}
      {`TODO: Think about what page to link to here.`}
    </div>
  );
}

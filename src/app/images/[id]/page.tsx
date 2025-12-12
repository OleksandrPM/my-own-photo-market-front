import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ImageByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Example of fetching data based on id
  // const data = await fetchData(id);

  // if (!data) {
  //   notFound(); // renders app/not-found.js
  // }

  return (
    <div className="container mx-auto">
      <h1>Image ID: {id}</h1>
      <p>This page shows image with specific ID.</p>
      {/* <Image src="" alt="" width={100} height={100} /> */}
    </div>
  );
}

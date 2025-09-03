import { notFound } from "next/navigation";
import Image from "next/image";

export default function ImageByIdPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // You can fetch image data here or use a client-side hook
  if (!id) return notFound();

  return (
    <div>
      <h1>Image ID: {id}</h1>
      {/* <Image src="" alt="" width={100} height={100} /> */}
    </div>
  );
}

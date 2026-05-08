"use client";

import { useEffect, useState } from "react";
import ImagesList from "@/components/ImagesList";

export default function ImagesPage() {
  // const [url, setUrl] = useState(null);

  // useEffect(() => {
  //   fetchStorageUrl();
  // }, []);

  // async function fetchStorageUrl() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/storage`,
  //   );
  //   console.log(res);

  //   const data = await res.json();
  //   console.log(data);
  //   setUrl(data.imgUrl);
  // }

  return (
    <div className="container mx-auto">
      <h2>Images Page</h2>
      {/* {url && <img src={url} alt="User's image" />} */}
      <p>
        This is the images page content. Shows all the images with pagination.
        Think about posibility of sorting by date, popularity etc.
      </p>
      <ImagesList images={[]} />
    </div>
  );
}

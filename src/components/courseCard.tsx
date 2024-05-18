import Image from "next/image";
import { DriveURL } from "@/libs/driveURL";
import Link from "next/link";

export default function CourseCard({
  id,
  subject,
  title,
  chapter,
  description,
  image,
}: {
  id: string;
  subject: string;
  title: string;
  chapter: string;
  description: string;
  image: string;
}) {
  return (
    <div className="shadow border border-gray-300 bg-white rounded-xl w-full p-5">
      <div className="w-full relative p-24">
        <Image
          style={{ borderRadius: "9px" }}
          src={DriveURL(image)}
          fill={true}
          objectFit="cover"
          alt={subject + " " + chapter}
        ></Image>
      </div>
      <div className="m-3 gap-y-2 flex flex-col items-start">
        <div className="inline-flex items-baseline gap-x-2">
          <h1 className="text-lg font-semibold">Subject: </h1>
          <h1 className="text-lg">
            {subject} ch.{chapter}
          </h1>
        </div>
        <div className="inline-flex items-baseline gap-x-2">
          <h1 className="text-lg font-semibold">Title: </h1>
          <h1 className="text-lg">{title}</h1>
        </div>
        <div className="inline-flex items-baseline gap-x-2">
          <h1 className="text-lg">{description}</h1>
        </div>
        <Link
          href={`/learn/${id}`}
          className="w-full bg-emerald-500 p-2 rounded-xl mt-1 text-center 
          text-white hover:bg-emerald-600 active:scale-75 transition-all"
        >
          Learn
        </Link>
      </div>
    </div>
  );
}

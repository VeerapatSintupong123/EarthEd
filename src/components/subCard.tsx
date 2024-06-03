import Link from "next/link";
import Image from "next/image";
import { DriveURL } from "@/libs/driveURL";
import { Geo } from "@/libs/orderUnit";

export default function SubCard({ url, sub }: { url: string; sub: string }) {
  const array = Geo(sub);
  return (
    <>
      <div className="shadow border border-gray-300 bg-white rounded-xl w-full p-5">
        <div className="w-full relative p-24">
          <Image
            style={{ borderRadius: "9px" }}
            src={DriveURL(url)}
            fill={true}
            objectFit="cover"
            alt={"Human"}
          ></Image>
        </div>
        <div className="mt-5 gap-y-2 flex flex-col item-center w-full">
          <h1 className="text-lg text-center">{sub}</h1>
          <div className="flex flex-col">
            {array.map((arr, index) => (
              <h1
                className="text-center text-sm text-gray-500 border-b border-gray-200 w-full py-1"
                key={index}
              >
                {arr || "\u00A0"}
              </h1>
            ))}
            <Link
              href={`/learn/${sub}`}
              className="w-full bg-orange p-2 rounded-xl mt-3 text-center 
            text-white hover:bg-orangeHover active:scale-75 transition-all"
            >
              Let's start
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

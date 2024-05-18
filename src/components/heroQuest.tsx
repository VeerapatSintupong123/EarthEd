import Link from "next/link";
import { useSession } from "next-auth/react";
import ImageSlider from "./imageSlider";

const HeroQuest: React.FC = () => {
  const { data: session } = useSession();

  return (
    <section
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      className="w-full px-8 py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto bg-slate-400 rounded-xl"
    >
      <div>
        <span className="block mb-2 text-s md:text-sm text-indigo-500 font-semibold">
          Time to Ignite
        </span>
        <h3 className="text-3xl md:text-6xl  font-semibold">
          Let's Learn And See The World
        </h3>
        <p className="text-base md:text-lg my-4 md:my-6">
          Online course platform about{" "}
          <span className="underline bg-green-500 p-1">Geography</span> which
          are taught by an{" "}
          <span className="bg-yellow-500 p-1">International Olympiad</span>
          student.
        </p>
        {session ? (
          <Link href="/">
            <button className="bg-orange text-white font-medium py-2 px-4 rounded transition-all hover:bg-orangeHover active:scale-75">
              Let's learn !
            </button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <button className="bg-orange text-white font-medium py-2 px-4 rounded transition-all hover:bg-orangeHover active:scale-75">
              Take course
            </button>
          </Link>
        )}
      </div>

      <div
        className="min-w-full min-h-[300px] bg-slate-50"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <ImageSlider
          images={[
            "https://drive.google.com/uc?export=download&id=1xteo9yqe829TtChXSv1f3MskQcw4C9R2",
            "https://drive.google.com/uc?export=download&id=1xteo9yqe829TtChXSv1f3MskQcw4C9R2",
            "https://drive.google.com/uc?export=download&id=1xteo9yqe829TtChXSv1f3MskQcw4C9R2",
          ]}
        />
      </div>
    </section>
  );
};

export default HeroQuest;

export default function GeniusHero() {
  return (
    <div
      className="rounded-2xl w-full p-5 bg-slate-50 2xl:w-2/5"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <h1 className="text-center font-bold text-2xl m-2">GeoGenius</h1>
      <hr className="h-1 bg-gray-600 mx-5 mb-4" />
      <h1 className="text-center font-semibold text-lg mx-4">
        Welcome to <span className="bg-orange p-1">GeoGenius!</span> Each day,
        we provide a new question in either{" "}
        <span className="bg-green-500 p-1">True</span> /{" "}
        <span className="bg-red-500 p-1">False</span> or{" "}
        <span className="bg-blue-500 p-1">multiple choice format</span>.
      </h1>
      <h1 className="text-center font-semibold text-lg mx-4">
        For <span className="bg-yellow-500 p-1">unlimited</span> questions,
        enroll in our course and <span className="bg-pink-500 p-1">enjoy</span>{" "}
        endless <span className="bg-amber-500 p-1"> practice anytime</span>.
      </h1>
      <h1 className="text-center font-semibold text-lg mx-4">
        <span className="bg-purple-500 p-1">Don't wait</span> for the daily
        question take the course and{" "}
        <span className="bg-rose-500 p-1">start now</span>!
      </h1>
      <hr className="h-1 bg-gray-600 mx-5 m-4" />
    </div>
  );
}

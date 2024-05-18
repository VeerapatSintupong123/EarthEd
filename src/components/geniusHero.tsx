export default function GeniusHero() {
  return (
    <div
      className="rounded-2xl w-full p-6 bg-white 2xl:w-2/5"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      <h1 className="text-center font-bold text-2xl m-2 text-gray-800">
        GeoGenius
      </h1>
      <hr className="h-1 bg-gray-300 mx-5 mb-4" />
      <h1 className="font-semibold text-lg mx-4 text-gray-700 leading-relaxed">
        <span className="font-bold text-3xl text-gray-900">Welcome</span> to{" "}
        <span className="text-gray-900">GeoGenius!</span> Each day, we provide a
        new question in either{" "}
        <span className="text-blue-600 font-medium">True</span> /{" "}
        <span className="text-red-600 font-medium">False</span> or{" "}
        <span className="text-green-600 font-medium">
          multiple choice format
        </span>
        .
      </h1>
      <h1 className="font-semibold text-lg mx-4 text-gray-700 leading-relaxed mt-4">
        For <span className="text-yellow-600 font-medium">unlimited</span>{" "}
        questions, enroll in our course and{" "}
        <span className="text-pink-600 font-medium">enjoy</span> endless{" "}
        <span className="text-amber-600 font-medium">practice anytime</span>.{" "}
        <span className="text-purple-600 font-medium">Don't wait</span> for the
        daily question, take the course and{" "}
        <span className="text-rose-600 font-medium">start now</span>!
      </h1>
      <hr className="h-1 bg-gray-300 mx-5 mt-4" />
    </div>
  );
}

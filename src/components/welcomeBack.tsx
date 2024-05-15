import Link from "next/link";

export default function WelcomeBack() {
  return (
    <main className="flex items-center justify-center min-h-[100vh] p-7 bg-gradient-to-br from-indigo-500 to-purple-500 relative overflow-hidden">
      <div className="absolute left-[0vw] bottom-[40vh] sm:left-[10vw] sm:bottom-[45vh] md:left-[15vw] md:bottom-[45vh] lg:left-[20vw] lg:bottom-[50vh] xl:left-[25vw] xl:bottom-[45vh] w-64 h-64 rounded-full bg-emerald-600"></div>
      <div className="absolute right-[0vw] bottom-[10vh] sm:right-[5vw] sm:bottom-[10vh] md:right-[15vw] md:bottom-[10vh] lg:right-[20vw] lg:bottom-[10vh] xl:right-[25vw] xl:bottom-[10vh] w-64 h-64 rounded-full bg-orange"></div>
      <div className="bg-white bg-opacity-90 rounded-xl p-10 max-w-lg text-center shadow-xl z-20">
        <h1 className="font-bold text-3xl text-gray-800 mb-5">Welcome back!</h1>
        <p className="text-lg text-gray-700 mb-4">
          You're already logged in. Ready to continue your learning journey?
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Click the button below to access the course page.
        </p>
        <Link
          href="/"
          className="bg-indigo-500 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-indigo-600 transition duration-300 ease-in-out inline-block"
        >
          Go to Learn Page
        </Link>
      </div>
    </main>
  );
}

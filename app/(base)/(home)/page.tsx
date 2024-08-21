import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-purple-400">
        <span className="block text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Your
        </span>
        <span className="block text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          <span className="block">Certificate</span>
          <span className="block">Verification Platform</span>
        </span>
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Streamlining certificate management with advanced and user-friendly
        solutions.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/verify"
          className="px-6 py-2 text-white bg-blue-500 rounded-full shadow hover:bg-blue-600 transition duration-300"
        >
          Verify certificate
        </Link>
        <Link
          href="/login"
          className="px-6 py-2 text-white bg-purple-500 rounded-full shadow hover:bg-purple-600 transition duration-300"
        >
          Manage certificate
        </Link>
      </div>
    </div>
  );
}

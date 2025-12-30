import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DoIt
        </h1>
        <p className="text-gray-600 mb-8">
          Your personal goal tracking app. Set goals, track progress, and achieve your dreams.
        </p>
        <Link
          href="/goals"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

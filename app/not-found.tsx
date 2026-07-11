import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="font-heading font-bold text-6xl mb-4">404</h1>
      <p className="text-gray-500 mb-8">Page not found.</p>
      <Link
        href="/shop"
        className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
      >
        Back to Shop
      </Link>
    </div>
  );
}

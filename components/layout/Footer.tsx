import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-section text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="font-heading font-bold text-2xl text-white">
              Dr Trend
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Elevating medical apparel into the realm of luxury
              performance-wear. Engineered for precision, designed for
              professionals.
            </p>
          </div>
          <FooterCol
            title="SHOP"
            links={[
              { label: "Shop All", href: "/shop" },
              { label: "About Us", href: "/about" },
            ]}
          />
          <FooterCol
            title="SUPPORT"
            links={[
              { label: "Contact", href: "/contact" },
              { label: "Shipping Policy", href: "/shipping" },
            ]}
          />
          <FooterCol
            title="POLICIES"
            links={[
              { label: "Returns", href: "/returns" },
              { label: "Privacy Policy", href: "/privacy" },
            ]}
          />
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2024 Dr Trend. Premium Medical Apparel.
          </p>
          <p className="text-xs text-gray-500">Made with care in Egypt.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

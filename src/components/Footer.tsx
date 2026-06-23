import Link from "next/link";
import {
  footerCompanyLinks,
  footerShopLinks,
  footerSocialLinks,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl tracking-wide">Dark Angel</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary">
              High-end luxury streetwear with a gothic-femme edge. Crafted for
              those who command presence.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em]">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerShopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em]">
              Company
            </h3>
            <ul className="space-y-3">
              {footerCompanyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em]">
              Social
            </h3>
            <ul className="space-y-3">
              {footerSocialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-center text-[11px] uppercase tracking-[0.15em] text-secondary">
            © Dark Angel Clothing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

const footerLinks = {
  gym: [
    { label: "Membership", href: "/membership" },
    { label: "Personal Trainer", href: "/personal-trainer" },
    { label: "Classes", href: "/classes" },
    { label: "Facilities", href: "/facilities" },
  ],
  shop: [
    { label: "Supplements", href: "/shop?category=supplements" },
    { label: "Merch", href: "/shop?category=merch" },
    { label: "Equipment", href: "/shop?category=equipment" },
    { label: "Bundles", href: "/shop?category=bundles" },
  ],
  support: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
    { label: "Shipping", href: "#" },
    { label: "Refund", href: "#" },
    { label: "Terms", href: "#" },
  ],
  social: [
    { label: "WhatsApp", href: "https://wa.me/6285186849980" },
    { label: "Instagram", href: "https://instagram.com/storygym.official" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gym-black border-t border-gym-border">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-extrabold tracking-[0.2em] text-white uppercase">
              Story<span className="text-gym-silver">Gym</span>
            </Link>
            <p className="text-xs font-bold tracking-[0.15em] text-gray-500 mt-3 uppercase leading-relaxed">
              Your Body.<br />Your Story.
            </p>
            <p className="text-[10px] text-gray-600 mt-4 leading-relaxed">
              Jl. Andi Djemma No. 1 C<br />
              Makassar, Indonesia
            </p>
          </div>

          {/* GYM */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gym-silver uppercase mb-4">Gym</h4>
            <ul className="space-y-2.5">
              {footerLinks.gym.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-gray-500 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gym-silver uppercase mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-gray-500 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gym-silver uppercase mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-gray-500 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gym-silver uppercase mb-4">Social</h4>
            <ul className="space-y-2.5">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gym-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Story Gym. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 tracking-wider">
            Makassar, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

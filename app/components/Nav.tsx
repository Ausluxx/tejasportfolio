import Link from "next/link";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/#skills" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[rgba(10,10,10,0.75)] backdrop-blur-md">
      <div className="shell flex h-[64px] items-center justify-between">
        <Link
          href="/"
          className="link-quiet whitespace-nowrap pr-8 text-[16px] font-normal tracking-tight"
          aria-label="Tejas Garg, home"
        >
          Tejas&nbsp;Garg
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="t-mono-xs link-quiet text-muted hover:text-[color:var(--color-bone)]">
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-pill">
            Contact
          </Link>
        </nav>

        {/* Mobile: single primary action keeps the bar on one line */}
        <Link href="/#contact" className="btn-pill md:hidden">
          Contact
        </Link>
      </div>
    </header>
  );
}

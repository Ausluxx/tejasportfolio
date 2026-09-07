const LINKS = [
  { label: "About", href: "/tejasportfolio/#about" },
  { label: "Experience", href: "/tejasportfolio/#experience" },
  { label: "Projects", href: "/tejasportfolio/projects" },
  { label: "Skills", href: "/tejasportfolio/#skills" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[rgba(10,10,10,0.75)] backdrop-blur-md">
      <div className="shell flex h-[64px] items-center justify-between">
        <a
          href="/tejasportfolio/"
          className="link-quiet whitespace-nowrap pr-8 text-[16px] font-normal tracking-tight"
          aria-label="Tejas Garg, home"
        >
          Tejas&nbsp;Garg
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="t-mono-xs link-quiet text-muted hover:text-[color:var(--color-bone)]"
            >
              {l.label}
            </a>
          ))}

          <a href="/tejasportfolio/#contact" className="btn-pill">
            Contact
          </a>
        </nav>

        <a href="/tejasportfolio/#contact" className="btn-pill md:hidden">
          Contact
        </a>
      </div>
    </header>
  );
}

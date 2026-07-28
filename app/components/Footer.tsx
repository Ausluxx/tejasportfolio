import Link from "next/link";

/**
 * Coordinate footer — the merged system's closing signature (DESIGN(1)):
 * hairline, metadata row, and a geographic stamp for Delhi.
 */
export default function Footer() {
  return (
    <footer className="shell pb-14 pt-28">
      <div className="hairline" />
      <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <p className="t-caption text-muted">
          © 2026 Tejas Garg · Delhi, India · Built for recruiters in IB, PE, VC
          &amp; fintech.
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <a
            href="https://www.linkedin.com/in/tejas-garg-806b4a22b"
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono-xs link-quiet text-muted"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ausluxx"
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono-xs link-quiet text-muted"
          >
            GitHub
          </a>
          <a
            href="mailto:tejasgarg1702@gmail.com"
            className="t-mono-xs link-quiet text-muted"
          >
            Email
          </a>
          <Link href="/projects" className="t-mono-xs link-quiet text-muted">
            Projects
          </Link>
          <span className="t-mono-xs text-faint" aria-hidden>
            28.61°N&nbsp;77.21°E
          </span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import Stamp from "./components/Stamp";
import Constellation from "./components/Constellation";

const LINKEDIN = "https://www.linkedin.com/in/tejas-garg-806b4a22b";
const RESUME = "/resume/Tejas-Garg-Resume.pdf";

const QUICK_FACTS: { label: string; text: string }[] = [
  { label: "Location", text: "Delhi, India" },
  {
    label: "Education",
    text: "B.Sc. (Research) Economics & Finance, 2023–2027 · CGPA 8.83/10",
  },
  {
    label: "Award",
    text: "Student of the Year 2026 — All-Round Achievement, Shiv Nadar University",
  },
  { label: "Experience", text: "Ex-Investment Banking Intern, Resurgent India" },
];

const FEATURED = [
  {
    title: "NSE Momentum + Quality Factor Backtest",
    body: "A long-only Indian-equity factor strategy with walk-forward testing and an interactive dashboard.",
    meta: "Live · GitHub",
    live: true,
    href: "/projects#nse",
  },
  {
    title: "Fama-French 3-Factor Model (India)",
    body: "A factor model for Indian equities with rolling betas and robust standard errors.",
    meta: "Live · GitHub",
    live: true,
    href: "/projects#fama",
  },
  {
    title: "SpaceX DCF Valuation",
    body: "A full three-statement DCF with scenario and sensitivity analysis.",
    meta: "GitHub · PDF",
    live: false,
    href: "/projects#spacex",
  },
  {
    title: "RemitRight — USD/INR Spread Intelligence",
    body: "Signals that flag when cross-border transfer spreads are cheap or expensive.",
    meta: "Write-up",
    live: false,
    href: "/projects#remitright",
  },
  {
    title: "NourishRx — Entrepreneurial Finance Capstone",
    body: "A simulated healthtech startup, financially modelled end to end.",
    meta: "Live · Write-up",
    live: true,
    href: "/projects#nourishrx",
  },
  {
    title: "Equity Research Terminal",
    body: "An AI-assisted tool that surfaces companies tied to real market events.",
    meta: "In development",
    live: false,
    href: "/projects#equity-research",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          {/* Constellation field — the page's single ambient artifact */}
          <Constellation className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.45) 60%, #0a0a0a 100%)",
            }}
          />

          <div className="shell relative flex min-h-[calc(100dvh-64px)] flex-col justify-center py-16">
            <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-[1.5fr_1fr]">
              {/* Left — the statement */}
              <div>
                <p className="t-stamp mb-8">
                  Economics &amp; Finance · Shiv Nadar University · Delhi, India
                </p>
                <h1 className="t-display">Tejas Garg</h1>
                <p className="t-heading-sm mt-8 max-w-[620px] text-balance">
                  Economics &amp; Finance student headed for{" "}
                  <span className="t-serif-italic">investment banking</span> —
                  with the deal experience and the quant projects to back it up.
                </p>
                <p className="t-body mt-6 max-w-[560px] text-muted">
                  I spent my summer inside a merchant bank building deal
                  pipelines, and I spend my own time building the finance tools
                  I want to understand — factor backtests, valuation models,
                  spread-intelligence platforms. I&apos;m looking for an analyst
                  internship now and full-time analyst roles in 2027.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-solid"
                  >
                    Connect on LinkedIn
                  </a>
                  <a href={RESUME} className="btn-pill" download>
                    Download Résumé
                  </a>
                </div>
              </div>

              {/* Right — boarding-pass fact card (DESIGN(1) hero pattern) */}
              <aside className="card relative overflow-hidden p-8">
                <div className="flex items-center justify-between">
                  <p className="t-mono-xs text-muted">Candidate Profile</p>
                  <p className="t-mono-xs text-faint">TG · 2027</p>
                </div>
                <div className="ember-rule mt-5" />
                <ul className="mt-6 space-y-6">
                  {QUICK_FACTS.map((f) => (
                    <li key={f.label}>
                      <p className="t-mono-xs text-faint">{f.label}</p>
                      <p className="t-caption mt-1.5">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="shell scroll-mt-20 pt-[120px]">
          <Reveal>
            <Stamp>About Tejas</Stamp>
          </Reveal>
          <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[1.5fr_1fr]">
            <Reveal className="space-y-6">
              <p className="t-body-lg">
                I&apos;m a fourth-year Economics and Finance student at Shiv
                Nadar University, on track to graduate in 2027. My interest sits
                where finance meets rigour: understanding{" "}
                <span className="t-serif-italic">why</span> a number is what it
                is, then pressure-testing it.
              </p>
              <p className="t-body text-muted">
                That shows up two ways. Professionally, I interned as an
                investment banking analyst at Resurgent India, a Category I
                Merchant Banker, where I built investor profiles and a live deal
                database used for sourcing. Independently, I build the quant and
                valuation tools I want to learn from — a momentum-and-quality
                factor backtest on Indian equities, a Fama-French three-factor
                model, a SpaceX DCF, and a USD/INR spread-intelligence platform
                among them. I&apos;m honest about the boundary: I use modern
                tooling (including AI) to build, but I own the financial logic
                behind every one of them and can walk you through it.
              </p>
              <p className="t-body text-muted">
                Alongside coursework I&apos;ve served in two elected Student
                Council roles — Secretary of Treasury and, now, Secretary of
                Senate — managing real budgets and writing the governance
                policies that outlast me. Academically, I&apos;ve made the
                Dean&apos;s List twice and was named my program&apos;s Student
                of the Year for 2026.
              </p>
              <p className="t-body-lg">
                If you&apos;re hiring for investment banking, private equity,
                venture capital, or fintech, I&apos;d like to talk.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card p-8">
                <p className="t-mono-xs text-faint">Education</p>
                <ul className="mt-6 space-y-6">
                  <li>
                    <p className="t-body">
                      B.Sc. (Research), Economics and Finance
                    </p>
                    <p className="t-caption mt-1.5 text-muted">
                      Shiv Nadar University · 2023–2027 · CGPA 8.83/10
                    </p>
                  </li>
                  <li className="border-t pt-6">
                    <p className="t-body">Dean&apos;s List</p>
                    <p className="t-caption mt-1.5 text-muted">
                      Spring 2025 (SGPA 9.32) &amp; Monsoon 2025 (SGPA 8.96),
                      top 10% of program
                    </p>
                  </li>
                  <li className="border-t pt-6">
                    <p className="t-body">
                      Student of the Year 2026 — All-Round Achievement
                    </p>
                    <p className="t-caption mt-1.5 text-muted">
                      awarded on SNU Day by the Chancellor and Vice Chancellor
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="shell scroll-mt-20 pt-[120px]">
          <Reveal>
            <Stamp>Experience</Stamp>
          </Reveal>

          {/* Resurgent India */}
          <Reveal>
            <div className="relative">
              <span className="ghost-num absolute -top-4 right-0 hidden lg:block">
                01
              </span>
              <div className="grid gap-x-20 gap-y-6 lg:grid-cols-[1fr_1.6fr]">
                <div>
                  <h3 className="t-heading-sm">
                    Investment Banking Intern — Resurgent India
                  </h3>
                  <p className="t-mono-xs mt-4 text-muted">
                    Category I Merchant Banker · Gurugram
                  </p>
                  <p className="t-mono-xs mt-1.5 text-faint">
                    Jun 2025 – Aug 2025
                  </p>
                </div>
                <div className="space-y-5">
                  <p className="t-body text-muted">
                    A summer inside live deal work at a Category I Merchant
                    Banker. What I did:
                  </p>
                  <ul className="space-y-4">
                    <li className="t-body">
                      Prepared detailed investment profiles for 15+ firms across
                      fintech, renewable energy, B2B marketplaces, education
                      finance, and consumer goods.
                    </li>
                    <li className="t-body border-t pt-4">
                      Built and maintained &ldquo;Deal Tracker&rdquo; — a live
                      database of 200+ Indian funding rounds and 150+ fund
                      profiles (sector focus, stage, portfolio fit), using
                      Tracxn for market mapping and deal sourcing.
                    </li>
                    <li className="t-body border-t pt-4">
                      Sourced and profiled 100+ new investors through cold email
                      and cold-call outreach.
                    </li>
                    <li className="t-body border-t pt-4">
                      Benchmarked valuation multiples and competitive
                      positioning across 15+ companies via structured peer
                      comparisons that fed deal-pipeline research.
                    </li>
                  </ul>
                  <p className="t-body t-serif-italic text-muted">
                    What I took away: how a deal actually gets sourced,
                    screened, and pitched — and how much of banking is
                    disciplined research done well.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="my-16 hairline" />

          {/* Student Council */}
          <Reveal>
            <div className="relative">
              <span className="ghost-num absolute -top-4 right-0 hidden lg:block">
                02
              </span>
              <div className="grid gap-x-20 gap-y-6 lg:grid-cols-[1fr_1.6fr]">
                <div>
                  <h3 className="t-heading-sm">
                    Positions of Responsibility — Student Council, Shiv Nadar
                    University
                  </h3>
                </div>
                <div className="space-y-12">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="t-body-lg">Secretary of Senate</p>
                      <p className="t-mono-xs text-faint">Mar 2026 – Present</p>
                    </div>
                    <ul className="mt-5 space-y-4">
                      <li className="t-body">
                        Co-heads cross-committee coordination across 6+
                        committees to streamline policy discussion and
                        implementation.
                      </li>
                      <li className="t-body border-t pt-4">
                        Maintains official records and resolutions across 10–20
                        Senate and Executive Cabinet meetings to date.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="t-body-lg">Secretary of Treasury</p>
                      <p className="t-mono-xs text-faint">Mar 2025 – Present</p>
                    </div>
                    <ul className="mt-5 space-y-4">
                      <li className="t-body">
                        Managed 200+ budget approvals and reimbursements for 58
                        clubs and societies (₹20–25L total allocation).
                      </li>
                      <li className="t-body border-t pt-4">
                        Resolved 100+ fee-related issues through coordination
                        with university administration.
                      </li>
                      <li className="t-body border-t pt-4">
                        Co-authored institutional financial-governance policies
                        — treasury handover protocols, audit procedures,
                        fee-waiver reforms — compiled into a Treasury Policy
                        Compendium.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================= PROJECTS (summary) ================= */}
        <section id="projects" className="shell scroll-mt-20 pt-[120px]">
          <Reveal>
            <Stamp>Projects</Stamp>
            <p className="t-heading max-w-[880px]">
              Deal work taught me the craft. These are the things I built on my
              own to understand markets more deeply — quant strategies,
              valuation models, and fintech tools, with the financial reasoning
              behind each one.
            </p>
          </Reveal>

          <ul className="mt-16">
            {FEATURED.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.03}>
                <li>
                  <Link href={p.href} className="group block border-t py-7">
                    <div className="grid items-baseline gap-x-10 gap-y-2 md:grid-cols-[auto_1.35fr_1fr_auto]">
                      <span className="t-mono hidden w-10 text-faint md:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="t-heading-sm transition-colors duration-500 group-hover:text-[color:var(--color-ember)]">
                        {p.title}
                      </h3>
                      <p className="t-caption text-muted">{p.body}</p>
                      <p className="t-mono-xs flex items-center gap-2 whitespace-nowrap text-faint md:justify-self-end">
                        {p.live && <span className="dot-live" aria-hidden />}
                        {p.meta}
                      </p>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="border-t pt-10">
              <Link href="/projects" className="link-arrow t-heading-sm">
                See all projects <span className="arr">→</span>
              </Link>
            </div>
          </Reveal>
        </section>

        {/* ================= SKILLS — the one paper flip ================= */}
        <section id="skills" className="scroll-mt-20 pt-[120px]">
          <div className="paper py-[96px]">
            <div className="shell">
              <Reveal>
                <div className="mb-12">
                  <h2 className="t-stamp-lg">Skills &amp; Certifications</h2>
                  <div className="ember-rule mt-6 max-w-[420px]" />
                </div>
              </Reveal>

              <div className="grid gap-x-20 gap-y-14 lg:grid-cols-2">
                <Reveal>
                  <p className="t-mono-xs text-faint">Certifications</p>
                  <ul className="mt-6 space-y-5">
                    {[
                      ["McKinsey Forward Program", "McKinsey & Company"],
                      ["Bloomberg Market Concepts (BMC)", "Bloomberg"],
                      ["Bloomberg Finance Fundamentals", "Bloomberg"],
                      ["Financial Markets", "Yale University"],
                    ].map(([name, issuer], i) => (
                      <li
                        key={name}
                        className={
                          "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 " +
                          (i > 0 ? "border-t pt-5" : "")
                        }
                      >
                        <span className="t-body-lg">{name}</span>
                        <span className="t-mono-xs text-muted">{issuer}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.08} className="space-y-10">
                  <div>
                    <p className="t-mono-xs text-faint">Finance</p>
                    <p className="t-body-lg mt-3">
                      Financial modeling · DCF · comparable-company &amp;
                      precedent-transaction analysis · equities &amp; valuation
                      · investor profiling · deal sourcing · portfolio analysis
                    </p>
                  </div>
                  <div className="border-t pt-8">
                    <p className="t-mono-xs text-faint">Technical</p>
                    <p className="t-body-lg mt-3">
                      Microsoft Excel · PowerPoint ·
                      Tracxn · Google Workspace · Canva · Adobe Premiere Pro ·
                      Adobe Photoshop
                    </p>
                  </div>
                  <div className="border-t pt-8">
                    <p className="t-mono-xs text-faint">Languages</p>
                    <p className="t-body-lg mt-3">
                      English (fluent) · Hindi (native) · French (DELF A2)
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="shell scroll-mt-20 pt-[120px]">
          <Reveal>
            <Stamp>Let&apos;s talk</Stamp>
            <p className="t-heading max-w-[980px]">
              I&apos;m actively looking for analyst roles — an internship now,
              full-time from 2027 — in investment banking, private equity,
              venture capital, and fintech. The fastest way to reach me is
              LinkedIn or email. My résumé has the full detail.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-solid"
              >
                Connect on LinkedIn
              </a>
              <a href={RESUME} className="btn-pill" download>
                Download Résumé
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
              <a
                href="mailto:tejasgarg1702@gmail.com"
                className="link-arrow t-body-lg"
              >
                tejasgarg1702@gmail.com <span className="arr">→</span>
              </a>
              <a
                href="https://github.com/Ausluxx"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow t-body-lg"
              >
                github.com/Ausluxx <span className="arr">→</span>
              </a>
            </div>

            <p className="t-caption mt-9 text-faint">
              (Phone number intentionally kept off the public site — routed
              through email/LinkedIn.)
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

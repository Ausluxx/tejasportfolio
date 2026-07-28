import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const LINKEDIN = "https://www.linkedin.com/in/tejas-garg-806b4a22b";
const RESUME = "/resume/Tejas-Garg-Resume.pdf";

export const metadata: Metadata = {
  title: "Projects — Tejas Garg | Quant, Valuation & Fintech",
  description:
    "Quant finance and valuation projects by Tejas Garg — factor backtests on Indian equities, a Fama-French model, a SpaceX DCF, USD/INR spread intelligence, and more.",
};

type Proof = { label: string; href: string };

type Project = {
  id: string;
  title: string;
  subtitle: string;
  idea: string;
  does: string[];
  finance: string;
  proof?: Proof[];
  live?: boolean;
  status?: string;
  images?: { src: string; alt: string }[];
};

const PROJECTS: Project[] = [
  {
    id: "nse",
    title: "NSE Momentum + Quality Factor Backtest",
    subtitle: "Quant equity strategy · Python · Live dashboard",
    live: true,
    idea: "Do momentum and quality — two of the best-documented equity factors — still earn their keep on Indian large-caps once you account for real trading costs? This is my attempt to test that honestly rather than take it on faith.",
    does: [
      "A long-only strategy that ranks NSE stocks on combined momentum and quality signals, weighting the two by their information coefficient rather than guessing.",
      "Uses a quadratic-programming optimizer to build the portfolio under real-world constraints.",
      "Walk-forward backtesting with transaction costs — testing on data the model hasn't seen, so results aren't flattered by hindsight.",
      "An interactive dashboard to explore performance and holdings.",
    ],
    finance:
      "factor investing, signal combination, portfolio construction under constraints, and why out-of-sample testing and costs are what separate a real edge from a curve-fit.",
    proof: [
      {
        label: "Live dashboard",
        href: "https://nse-momentum-quality-prj2-nse50.streamlit.app/",
      },
      { label: "GitHub", href: "https://github.com/Ausluxx/nse-momentum-quality" },
    ],
    images: [
      {
        src: "/img/momentum-1.png",
        alt: "NSE Momentum + Quality backtest dashboard",
      },
      {
        src: "/img/momentum-2.png",
        alt: "NSE Momentum + Quality performance and holdings view",
      },
    ],
  },
  {
    id: "fama",
    title: "Fama-French 3-Factor Model (India)",
    subtitle: "Factor model · Python · Live dashboard",
    live: true,
    idea: "The Fama-French three-factor model is the standard lens for explaining stock returns beyond the market. I rebuilt it for Indian equities to see how market, size, and value factors behave here.",
    does: [
      "Estimates factor exposures for Indian equities across market, size (SMB), and value (HML).",
      "Rolling betas to show how those exposures drift over time rather than assuming they're fixed.",
      "Newey-West (HAC) standard errors so the statistics hold up when returns are autocorrelated and heteroskedastic.",
      "A multi-panel visualization dashboard.",
    ],
    finance:
      "what drives cross-sectional returns, why a single market beta isn't enough, and how to report factor results without overstating their significance.",
    proof: [
      {
        label: "Live dashboard",
        href: "https://factor-analytics-terminal-nse50.streamlit.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Ausluxx/factor-analytics-terminal",
      },
    ],
    images: [
      {
        src: "/img/fama.png",
        alt: "Fama-French 3-factor model dashboard for Indian equities",
      },
    ],
  },
  {
    id: "spacex",
    title: "SpaceX DCF Valuation Model",
    subtitle: "Valuation · Excel",
    idea: "Value one of the most-watched private companies in the world from first principles — a clean, defensible DCF a reviewer could pick apart line by line.",
    does: [
      "A full three-statement model feeding a discounted-cash-flow valuation.",
      "Scenario analysis and sensitivity tables to show how the valuation moves with growth and discount-rate assumptions.",
      "Terminal value via both a Gordon Growth and an exit-multiple approach, cross-checked against each other.",
    ],
    finance:
      "DCF mechanics, the tyranny of terminal-value assumptions, and why a valuation is only as honest as its sensitivity table.",
    proof: [
      { label: "GitHub", href: "https://github.com/Ausluxx/SpaceX-DCF-Model" },
      { label: "Cover / summary", href: "/SpaceX-DCF-Model-Cover.pdf" },
    ],
  },
  {
    id: "remitright",
    title: "RemitRight: USD/INR Spread Intelligence Platform",
    subtitle: "Fintech · Course: FinTech, Shiv Nadar University",
    idea: "People sending money across borders rarely know if they're getting a fair rate. RemitRight turns the USD/INR remittance spread into a simple GREEN / AMBER / RED signal.",
    does: [
      "Applies z-score modelling on RBI DBIE data to score today's spread against a 30-day rolling baseline.",
      "A structural risk calendar that flags predictable spread surges — month-end, FOMC dates, pre-Diwali demand.",
      "An all-in cost comparator that includes the correspondent-bank charges most remittance apps quietly leave out.",
    ],
    finance:
      "statistical baselines and mean reversion, how macro events move FX spreads, and why the “true” cost of a transfer is bigger than the headline rate.",
    proof: [
      {
        label: "Write-up",
        href: "https://www.linkedin.com/posts/tejas-garg-806b4a22b_fintech-economics-remittance-ugcPost-7455692689859178496-s90S/",
      },
    ],
  },
  {
    id: "nourishrx",
    title: "NourishRx: Entrepreneurial Finance Capstone",
    subtitle:
      "Startup finance · Course: Entrepreneurial Finance, Shiv Nadar University",
    live: true,
    idea: "Build and defend a healthtech startup end to end — from the market problem to the raise — the way a founder would in front of investors.",
    does: [
      "A simulated startup for condition-specific meal prep targeting India's 103M+ diabetic and 20M+ PCOD population, built around a 78% two-week dropout rate from prescribed diet plans.",
      "Structured a ₹16L SAFE Note seed raise at a ₹1.5Cr valuation cap.",
      "A 3-year financial model projecting an 11.9x LTV/CAC ratio, 49.8% gross margin, Year-2 break-even, and a 7.4x conservative-case investor return.",
      "Delivered a 12-slide investor deck, a live 15-minute pitch, and a 7-minute VC-style Q&A before faculty investors.",
    ],
    finance:
      "unit economics, SAFE-note and valuation-cap mechanics, and building a model an investor will actually stress-test.",
    proof: [
      { label: "Live site", href: "https://nizq11.github.io/NourishRx/" },
      {
        label: "Write-up",
        href: "https://www.linkedin.com/posts/tejas-garg-806b4a22b_nourishrx-fac311-capstone-ugcPost-7455719959684616192-9Bz0/",
      },
    ],
  },
  {
    id: "equity-research",
    title: "Equity Research Terminal",
    subtitle: "Equity research · AI-assisted · Python",
    idea: "Most research tools wait for you to ask. This one surfaces 2–3 companies every few days, tied to real market events, so learning follows what's actually moving.",
    does: [
      "Pulls fundamentals from Financial Modeling Prep (FMP) as the primary source, with web search as a supplement.",
      "Uses AI to connect recent events to companies worth a closer look — an experiment in AI-assisted research workflows.",
    ],
    finance:
      "what makes a company worth researching right now, and how to structure fundamental data into something you can act on.",
    status: "Under active development — link coming soon.",
  },
  {
    id: "ai-finance",
    title: "Personal AI Finance Assistant",
    subtitle: "Fintech · PWA · FastAPI · Next.js",
    idea: "Expense tracking fails because logging is a chore. This assistant lets you record spending in plain language — “180 Uber” — from your phone, and does the structuring for you.",
    does: [
      "An installable iPhone PWA that parses natural-language expense entries into structured transactions.",
      "A local-first design: a Python/FastAPI backend, SQLite storage, and a Cloudflare Workers relay, built for privacy and frictionless capture.",
    ],
    finance:
      "how personal-finance data should be categorised, and why removing friction is the whole game in expense tracking.",
    status: "Under active development — link coming soon.",
  },
  {
    id: "quant-explainer",
    title: "Interactive Quant Concepts Explainer",
    subtitle: "Education · HTML",
    idea: "A glossary-first, beginner-friendly explainer for the quant ideas people bounce off of — factor models, CAPM, and the rest — written the way I wish they'd been explained to me.",
    does: [
      "Walks through core quant-investing concepts in plain language, glossary-first so nothing assumes prior jargon.",
    ],
    finance:
      "if you can explain factor models and CAPM simply, you actually understand them.",
    status: "Available on request — public link to be added.",
  },
];

function ProjectBlock({ p, index }: { p: Project; index: number }) {
  return (
    <article id={p.id} className="relative scroll-mt-24 border-t pt-16">
      <span className="ghost-num absolute right-0 top-8 hidden lg:block">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Reveal>
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[1fr_1.7fr]">
          {/* Left rail — title, subtitle, proof */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="t-heading max-w-[420px]">{p.title}</h2>
            <p className="t-mono-xs mt-5 flex items-center gap-2 text-muted">
              {p.live && <span className="dot-live" aria-hidden />}
              {p.subtitle}
            </p>

            {p.proof && (
              <ul className="mt-9 space-y-3">
                {p.proof.map((pr) => (
                  <li key={pr.label}>
                    <a
                      href={pr.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow t-body"
                    >
                      {pr.label} <span className="arr">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {p.status && (
              <p className="btn-pill mt-9 cursor-default whitespace-normal text-muted hover:!border-[color:var(--color-hairline-2)] hover:!text-[color:var(--color-steel)]">
                {p.status}
              </p>
            )}
          </div>

          {/* Right — idea / what it does / the finance */}
          <div className="space-y-10">
            <div>
              <p className="t-mono-xs mb-3 text-faint">The idea</p>
              <p className="t-body-lg">{p.idea}</p>
            </div>

            <div>
              <p className="t-mono-xs mb-4 text-faint">What it does</p>
              <ul className="space-y-4">
                {p.does.map((d, i) => (
                  <li
                    key={d}
                    className={"t-body " + (i > 0 ? "border-t pt-4" : "")}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="t-mono-xs mb-3 text-faint">The finance behind it</p>
              <p className="t-body t-serif-italic text-muted">{p.finance}</p>
            </div>
          </div>
        </div>
      </Reveal>

      {p.images && (
        <Reveal delay={0.08}>
          <div
            className={
              "mt-12 grid gap-6 " +
              (p.images.length > 1 ? "md:grid-cols-2" : "md:grid-cols-[minmax(0,720px)]")
            }
          >
            {p.images.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full rounded-[12px] border"
              />
            ))}
          </div>
        </Reveal>
      )}
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="shell pt-20">
        <Reveal>
          <p className="t-stamp mb-8">Quant · Valuation · Fintech</p>
          <h1 className="t-display-sm">Projects</h1>
          <div className="ember-rule mt-8 max-w-[420px]" />
          <p className="t-body-lg mt-9 max-w-[840px] text-muted">
            These are the finance projects I&apos;ve built to learn — quant
            strategies, valuation models, and fintech tools. For each, I care
            most about the reasoning: what question it answers, what assumptions
            it rests on, and what it gets right or wrong. I build with modern
            tooling, but the financial logic is mine and I can walk through any
            of it.
          </p>
        </Reveal>

        <div className="mt-24 space-y-24">
          {PROJECTS.map((p, i) => (
            <ProjectBlock key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* Bottom CTA — verbatim from COPY.md */}
        <Reveal>
          <div className="mt-28 border-t pt-12">
            <p className="t-heading-sm max-w-[860px]">
              Like what you see?{" "}
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet text-ember"
              >
                Connect on LinkedIn
              </a>{" "}
              ·{" "}
              <a href={RESUME} download className="link-quiet">
                or download my résumé
              </a>
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

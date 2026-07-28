/**
 * Stamped section signpost — the boarding-pass voice (DESIGN(1)).
 * Mono, uppercase, wide-tracked, with an ember rule bleeding away beneath.
 */
export default function Stamp({ children }: { children: string }) {
  return (
    <div className="mb-12">
      <h2 className="t-stamp-lg">{children}</h2>
      <div className="ember-rule mt-6 max-w-[420px]" />
    </div>
  );
}

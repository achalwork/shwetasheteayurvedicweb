import { useLang } from '../../hooks/useLang'

// Classical Ayurvedic concepts as a decorative ribbon (no claims, no data).
export default function Marquee() {
  const { site } = useLang()
  const words: [string, string][] = site.marquee.map(w => [w.name, w.gloss])
  const row = [...words, ...words]
  return (
    <div className="on-dark marquee relative overflow-hidden bg-forest-deep py-5 text-ivory" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map(([name, gloss], i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="px-7 font-display text-2xl italic text-ivory/90">{name}</span>
                <span className="font-sans text-sm uppercase tracking-[0.18em] text-gold-light">{gloss}</span>
                <span className="mx-7 text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

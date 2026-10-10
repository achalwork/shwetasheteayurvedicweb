// Classical Ayurvedic concepts as a decorative ribbon (no claims, no data).
const words: [string, string][] = [
  ['Dinacharya', 'daily rhythm'], ['Ritucharya', 'seasonal living'], ['Ahara', 'nourishing food'], ['Vihara', 'mindful lifestyle'],
  ['Nidra', 'restful sleep'], ['Prakriti', 'your constitution'], ['Svasthya', 'true wellbeing'],
]

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="on-dark marquee relative overflow-hidden bg-forest-deep py-5 text-ivory" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map(([en, mr], i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="px-7 font-display text-2xl italic text-ivory/90">{en}</span>
                <span className="font-sans text-sm uppercase tracking-[0.18em] text-gold-light">{mr}</span>
                <span className="mx-7 text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

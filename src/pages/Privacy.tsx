import PageHeader from '../components/ui/PageHeader'
import { useLang } from '../hooks/useLang'

// DRAFT: the practice (and a legal adviser) must review the wording — in both languages — especially
// retention and deletion, before real patients use the site. The copy itself lives in src/i18n/site.ts.
export default function Privacy() {
  const { site } = useLang()
  const p = site.privacy
  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHeader>
      <section className="bg-ivory py-16 sm:py-24">
        <div className="wrap max-w-3xl space-y-10">
          {p.sections.map(([h, body]) => (
            <div key={h}><h2 className="text-3xl">{h}</h2><p className="mt-3 leading-relaxed text-ink-muted">{body}</p></div>
          ))}
        </div>
      </section>
    </>
  )
}

import portrait from '../../assets/portrait.webp'
import { useLang } from '../../hooks/useLang'

// Photo la 135% width ne top-left pasun zoom kela ahe, mhanje chehra circle chya center la yeto.
// Chehra khali/var vattat astil tar w-[135%] badla (jaast = jaast zoom).
export default function DoctorProfile({ compact = false }: { compact?: boolean }) {
  const doctor = useLang().site.doctor
  return (
    <div className="flex items-center gap-4">
      <span className={`${compact ? 'h-14 w-14' : 'h-[4.5rem] w-[4.5rem]'} relative block shrink-0 overflow-hidden rounded-full border-2 border-gold`}>
        <img src={portrait} alt="" className="absolute left-0 top-0 w-[135%] max-w-none" />
      </span>
      <div>
        <p className="font-display text-[1.45rem] font-semibold leading-tight text-forest-deep">{doctor.name}</p>
        <p className="text-xs font-semibold tracking-wide text-terracotta-dark">{doctor.quals}</p>
        <p className="text-xs text-ink-muted">{doctor.location}</p>
      </div>
    </div>
  )
}
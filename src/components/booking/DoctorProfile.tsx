import portrait from '../../assets/portrait.webp'
import { doctor } from '../../data/doctor'

export default function DoctorProfile({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <img src={portrait} alt="" width={compact ? 56 : 72} height={compact ? 56 : 72} className={`${compact ? 'h-14 w-14' : 'h-[4.5rem] w-[4.5rem]'} shrink-0 rounded-full border-2 border-gold object-cover object-[50%_10%]`} />
      <div>
        <p className="font-display text-[1.45rem] font-semibold leading-tight text-forest-deep">{doctor.name}</p>
        <p className="text-xs font-semibold tracking-wide text-terracotta-dark">{doctor.quals}</p>
        <p className="text-xs text-ink-muted">{doctor.location}</p>
      </div>
    </div>
  )
}

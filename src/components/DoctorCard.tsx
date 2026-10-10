import { MapPin, Video } from 'lucide-react'; import { doctor } from '../data/doctor'; import photo from '../assets/portrait.webp'
export default function DoctorCard() {
  return (<div className="flex items-center gap-4"><img src={photo} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-full object-cover object-top ring-2 ring-gold"/>
    <div><p className="font-display text-xl text-forest">{doctor.name}</p><p className="text-sm text-ink-muted">{doctor.quals}</p>
      <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted"><MapPin className="h-3.5 w-3.5"/>{doctor.location}<Video className="ml-2 h-3.5 w-3.5"/>Online</p></div></div>)
}

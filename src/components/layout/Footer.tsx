import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { doctor } from '../../data/doctor'
import { LogoMark, Sprig } from '../botanical/Botanicals'

const links: [string, string][] = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/online-consultation', 'Online Consultation'],
  ['/contact', 'Contact'],
  ['/privacy', 'Privacy Policy'],
]

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-forest-deep text-ivory">
      <Sprig className="pointer-events-none absolute -right-6 bottom-0 h-80 text-sage/20" aria-hidden />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3"><LogoMark className="h-10 w-10 text-gold-light" /><p className="font-display text-3xl">{doctor.name}</p></div>
          <p className="mt-4 text-sm font-semibold tracking-wide text-gold-light">{doctor.quals}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-ivory/80"><MapPin className="h-4 w-4 text-gold-light" />{doctor.location}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {links.map(([to, label]) => <li key={to}><Link to={to} className="link-u text-[0.95rem] text-ivory/85 hover:text-gold-light">{label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li><a href={doctor.phoneHref} className="flex items-center gap-3 text-ivory/90 hover:text-gold-light"><Phone className="h-4 w-4 text-gold-light" />{doctor.phone}</a></li>
            <li><a href={`mailto:${doctor.email}`} className="flex items-center gap-3 break-all text-ivory/90 hover:text-gold-light"><Mail className="h-4 w-4 shrink-0 text-gold-light" />{doctor.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="wrap relative flex flex-col gap-2 py-6 text-xs text-ivory/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {doctor.name}. All rights reserved.</p>
          <p>Online consultations are not a substitute for emergency care. In an emergency, visit the nearest hospital.</p>
        </div>
      </div>
    </footer>
  )
}

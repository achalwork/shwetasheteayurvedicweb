import { Link } from 'react-router-dom'; import { Phone, Mail, MapPin } from 'lucide-react'; import { doctor } from '../data/doctor'
export default function Footer() {
  return (<footer className="overflow-hidden bg-mint text-ink"><svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-12 w-full"><path d="M0 0H1440V26C1200 62 960 6 720 26S240 58 0 22Z" fill="#FFFAF3"/></svg>
    <div className="wrap grid gap-10 pb-10 pt-12 md:grid-cols-3">
    <div><p className="font-display text-2xl text-emerald">{doctor.name}</p><p className="mt-2 text-sm text-ink-muted">{doctor.quals}</p>
      <p className="mt-4 max-w-xs text-xs text-ink-muted">Online consultations are not for medical emergencies. In an emergency, go to the nearest hospital.</p></div>
    <div className="text-sm"><p className="mb-3 font-semibold text-emerald">Explore</p><ul className="space-y-2">{[['/', 'Home'], ['/about', 'About the Doctor'], ['/journey', 'Academic Journey'], ['/research', 'Research & Publications'], ['/consultation', 'Online Consultation'], ['/contact', 'Contact'], ['/privacy', 'Privacy policy']].map(([to, t]) => <li key={to}><Link className="link-u" to={to}>{t}</Link></li>)}</ul></div>
    <div className="space-y-3 text-sm"><p className="font-semibold text-emerald">Contact</p>
      <a className="flex gap-2 hover:text-clay" href={`tel:+91${doctor.phone}`}><Phone className="h-4 w-4"/>+91 {doctor.phone}</a>
      <a className="flex gap-2 break-all hover:text-clay" href={`mailto:${doctor.email}`}><Mail className="h-4 w-4 shrink-0"/>{doctor.email}</a>
      <p className="flex gap-2"><MapPin className="h-4 w-4"/>{doctor.location}</p></div></div>
    <p aria-hidden className="outline-text select-none whitespace-nowrap text-center font-display text-[17vw] leading-[.9] opacity-25">Shweta Shete</p>
    <div className="border-t border-night/10 py-4 text-center text-xs text-ink-muted">© {new Date().getFullYear()} {doctor.name}. Frontend prototype.</div></footer>)
}

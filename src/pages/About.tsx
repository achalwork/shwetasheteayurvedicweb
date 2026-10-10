import Portrait from '../components/hero/Portrait'; import { Rv } from '../components/animations/Reveal'; import { doctor } from '../data/doctor'
import { Intro, Timeline, Presentations, Workshops, Achievements, Skills, FinalCta } from '../components/academic/Sections'
export default () => <><section className="wrap grid items-center gap-14 py-16 lg:grid-cols-[1fr_1fr] lg:py-24"><Rv><h1 className="display">{doctor.name}</h1><p className="mt-5 text-xl text-forest/75">{doctor.quals} · {doctor.location}</p>
  <p className="mt-6 max-w-md text-lg text-ink-muted">Ayurvedic education, anatomical understanding and academic research, brought together in a thoughtful approach to personalized consultation.</p></Rv><div className="mx-auto w-full max-w-sm"><Portrait/></div></section>
  <Intro/><Timeline/><Presentations/><Workshops/><Achievements/><Skills/><FinalCta/></>

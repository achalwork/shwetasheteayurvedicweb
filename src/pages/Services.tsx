import PageHeader from '../components/ui/PageHeader'
import ServicesSection from '../components/home/ServicesSection'
import FinalCTA from '../components/home/FinalCTA'
import { useLang } from '../hooks/useLang'

export default function Services() {
  const { site } = useLang()
  const s = site.services
  return (
    <>
      <PageHeader eyebrow={s.pageEyebrow} title={s.pageTitle}>{s.pageSub}</PageHeader>
      <ServicesSection withFilter heading={s.pageHeading} />
      <FinalCTA />
    </>
  )
}

import PageHeader from '../components/ui/PageHeader'
import ServicesSection from '../components/home/ServicesSection'
import FinalCTA from '../components/home/FinalCTA'

export default function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Our Ayurvedic Services">Six consultation options, each bookable online. Choose one to see what it includes.</PageHeader>
      <ServicesSection withFilter heading="Find the right consultation" />
      <FinalCTA />
    </>
  )
}

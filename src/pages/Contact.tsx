import PageHeader from '../components/ui/PageHeader'
import ContactSection from '../components/home/ContactSection'
import { useLang } from '../hooks/useLang'

export default function Contact() {
  const { site } = useLang()
  return (
    <>
      <PageHeader eyebrow={site.contact.pageEyebrow} title={site.contact.pageTitle}>{site.contact.pageSub}</PageHeader>
      <ContactSection />
    </>
  )
}

import HeroSection from '../components/home/HeroSection'
import Marquee from '../components/home/Marquee'
import IntroSection from '../components/home/IntroSection'
import ServicesSection from '../components/home/ServicesSection'
import HowItWorks from '../components/home/HowItWorks'
import WhyChoose from '../components/home/WhyChoose'
import FAQSection from '../components/home/FAQSection'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <IntroSection />
      <ServicesSection />
      <HowItWorks />
      <WhyChoose />
      <FAQSection />
      <FinalCTA />
    </>
  )
}

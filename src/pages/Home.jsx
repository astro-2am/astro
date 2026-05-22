import { Hero } from '../components/home/Hero'
import { InsightsSection } from '../components/home/InsightsSection'
import { BirthChartSection } from '../components/home/BirthChartSection'
import { AiAstrologerSection } from '../components/home/AiAstrologerSection'
import { CompatibilitySection } from '../components/home/CompatibilitySection'
import { TrustSection } from '../components/home/TrustSection'
import { PricingSection } from '../components/home/PricingSection'

export function Home() {
  return (
    <>
      <Hero />
      <InsightsSection />
      <BirthChartSection />
      <AiAstrologerSection />
      <CompatibilitySection />
      <TrustSection />
      <PricingSection />
    </>
  )
}

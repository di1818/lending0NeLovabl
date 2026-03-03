import HeroSection from "@/components/HeroSection";
import PainsSection from "@/components/PainsSection";
import ForWhomSection from "@/components/ForWhomSection";
import ProgramSection from "@/components/ProgramSection";
import ResultsSection from "@/components/ResultsSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import ApplicationSection from "@/components/ApplicationSection";
import FooterSection from "@/components/FooterSection";
import CookieConsent from "@/components/CookieConsent";

const Index = () => (
  <main className="min-h-screen bg-background">
    <HeroSection />
    <PainsSection />
    <ForWhomSection />
    <ProgramSection />
    <ResultsSection />
    <AboutSection />
    <PricingSection />
    <ApplicationSection />
    <FooterSection />
    <CookieConsent />
  </main>
);

export default Index;

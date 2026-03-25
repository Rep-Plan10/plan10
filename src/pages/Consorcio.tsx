import LPHeader from "@/components/sections/LPHeader";
import LPHero from "@/components/sections/LPHero";
import TrustBar from "@/components/sections/TrustBar";
import WhatIsConsorcio from "@/components/sections/WhatIsConsorcio";
import Products from "@/components/sections/Products";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Stats from "@/components/sections/Stats";
import LPTestimonials from "@/components/sections/LPTestimonials";
import LeadForm from "@/components/sections/LeadForm";
import LPFinalCTA from "@/components/sections/LPFinalCTA";
import LPFooter from "@/components/sections/LPFooter";
import LPFloatingElements from "@/components/sections/LPFloatingElements";

const Consorcio = () => (
  <>
    <LPHeader />
    <main>
      <LPHero />
      <TrustBar />
      <WhatIsConsorcio />
      <Products />
      <HowItWorks />
      <Benefits />
      <Stats />
      <LPTestimonials />
      <LeadForm />
      <LPFinalCTA />
    </main>
    <LPFooter />
    <LPFloatingElements />
  </>
);

export default Consorcio;

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Differentials />
        <Process />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
    </>
  );
};

export default Index;

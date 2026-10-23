import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Reel from "@/components/Reel";
import Story from "@/components/Story";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Reel />
        <Story />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact deliveryConfigured={Boolean(process.env.INQUIRY_WEBHOOK_URL?.trim())} />
      </main>
      <Footer />
    </>
  );
}

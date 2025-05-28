

import CauseStudies from "@/components/landing/CauseStudies";
import ContactUs from "@/components/landing/ContactUs";
import Footer from "@/components/landing/Footer";
import Hearder from "@/components/landing/Hearder";
import Hero from "@/components/landing/Hero";
import OurWorkingProcess from "@/components/landing/OurWorkingProcess";
import Team from "@/components/landing/Team";
import Testimonials from "@/components/landing/Testimonial";
import WhyUs from "@/components/landing/Whyus";

export default function Home() {
  return (
    <>
    <Hearder/>
    <Hero />
    <WhyUs />
    <CauseStudies />
    <OurWorkingProcess/>
    <Team/>
    <Testimonials/>
    <ContactUs/>
    <Footer/>
    </>
  );
}

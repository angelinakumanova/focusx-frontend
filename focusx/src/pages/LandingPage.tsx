import NavBar from "@/components/NavBar";
import BenefitsSection from "@/components/sections/BenefitsSection";
import LandingSection from "@/components/sections/LandingSection";
import ProcessSection from "@/components/sections/ProcessSection";
import SectionDivider from "@/components/sections/SectionDivider";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <LandingSection />
      <BenefitsSection />
      <SectionDivider />
      <ProcessSection />
    </>
  );
};

export default LandingPage;

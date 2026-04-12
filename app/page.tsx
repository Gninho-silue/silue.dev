import CursorWrapper from '@/components/ui/CursorWrapper';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import StackSection from '@/components/sections/StackSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <CursorWrapper />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import CursorWrapper from '@/components/ui/CursorWrapper';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import StackSection from '@/components/sections/StackSection';

const PLACEHOLDERS = [
  { id: 'projects', label: 'Projects Section' },
  { id: 'experience', label: 'Experience Section' },
  { id: 'contact', label: 'Contact Section' },
];

export default function Home() {
  return (
    <>
      <CursorWrapper />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        {PLACEHOLDERS.map(({ id, label }) => (
          <section
            key={id}
            id={id}
            className="min-h-screen flex items-center justify-center border-b border-border"
          >
            <div className="text-center">
              <p className="font-mono text-xs text-muted mb-2 uppercase tracking-widest">
                #{id}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">{label}</h2>
              <p className="mt-2 text-muted text-sm">Placeholder — coming soon</p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

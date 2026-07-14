import { Navbar } from '@/components/layout/Navbar';
import { LandingHero } from '@/components/features/landing/LandingHero';
import { BuilderTeaser } from '@/components/features/landing/BuilderTeaser';
import { MoodSection } from '@/components/features/landing/MoodSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <LandingHero />
      <BuilderTeaser />
      <MoodSection />

      <footer className="bg-footer py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-right">
            <p className="font-display text-2xl text-gold">توليفة</p>
            <p className="font-sans font-light text-sm mt-1 text-body">
              قهوة عربية أصيلة بلمسة عصرية
            </p>
          </div>
          <p className="font-sans font-light text-xs text-muted/60">
            © ٢٠٢٦ توليفة — جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </main>
  );
}

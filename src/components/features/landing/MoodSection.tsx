'use client';

import { motion } from 'framer-motion';
import { MoodCard } from './MoodCard';
import { EnergyIcon, MoonIcon, CreamyIcon, ChocolateIcon } from './MoodIcons';

const MOODS = [
  { title: 'طاقة',      flavorNote: 'حاد ومركّز، مع لمسة من الحمضيات المشرقة',          price: '٤٥', icon: <EnergyIcon size={48} /> },
  { title: 'سهر',       flavorNote: 'ناعم وعميق، يرافقك في ساعات الليل الهادئة',        price: '٤٢', icon: <MoonIcon size={48} /> },
  { title: 'كريمي',     flavorNote: 'مخملي وناعم، كالقشطة الطازجة تذوب على اللسان',     price: '٥٠', icon: <CreamyIcon size={48} /> },
  { title: 'شوكولاتة',  flavorNote: 'عميق وغني، مع خلفية من الشوكولاتة الداكنة',         price: '٤٨', icon: <ChocolateIcon size={48} /> },
] as const;

export function MoodSection() {
  return (
    <section className="relative bg-section pt-20 pb-20 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <p className="font-sans font-light text-[10px] tracking-[0.5em] uppercase mb-4 text-gold-deep">
          مجموعتنا المختارة
        </p>
        <h2 className="font-display text-heading leading-tight text-[clamp(2.4rem,6.5vw,4rem)]">
          اختر مزاجك
        </h2>
        <p className="font-sans font-light mt-3 text-body text-[0.9rem]">
          أربع توليفات مصممة بعناية لكل لحظة
        </p>
      </motion.div>

      {/* Cards — stagger in on scroll */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-5">
        {MOODS.map((mood, i) => (
          <MoodCard key={mood.title} {...mood} index={i} />
        ))}
      </div>

      {/* Serious section CTA — no emoji, fills gold on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-center mt-14"
      >
        <p className="font-sans font-light text-[0.78rem] tracking-[0.06em] text-muted mb-7">
          لا تجد ما يناسبك؟
        </p>
        <motion.button
          whileTap={{ y: 1, filter: 'brightness(0.96)' }}
          className="font-display text-gold text-[1.25rem] w-full max-w-120 py-4.5 px-12 rounded border border-gold/30 transition-colors duration-300 hover:bg-gold hover:text-page"
        >
          اصنع توليفتك الخاصة
        </motion.button>
      </motion.div>
    </section>
  );
}

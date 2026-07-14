'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type MoodCardProps = {
  title: string;
  flavorNote: string;
  price: string;
  index: number;
  onAddToCart?: () => void;
};

export function MoodCard({ title, flavorNote, price, index, onAddToCart }: MoodCardProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (added) return;
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 1300);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ backgroundColor: '#4E2E1A', y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="relative flex-1 min-w-45 min-h-105 rounded-xl overflow-hidden flex flex-col border border-card-border bg-card"
    >
      {/* Visual zone — embossed mood letter (one step darker than the zone behind it) */}
      <div className="relative h-42.5 shrink-0 flex items-center justify-center overflow-hidden bg-section">
        <span
          aria-hidden="true"
          className="font-display text-page text-[8.5rem] leading-none tracking-tighter select-none"
        >
          {title[0]}
        </span>
      </div>

      {/* Identity zone */}
      <div className="px-5 pt-5">
        <h3 className="font-display text-heading text-[1.75rem] leading-none">
          {title}
        </h3>
        <div className="mt-3 h-px w-10 bg-gold" />
      </div>

      {/* Character zone */}
      <div className="px-5 pt-3 flex-1">
        <p className="font-sans font-light text-body text-[0.8rem] leading-relaxed">
          {flavorNote}
        </p>
      </div>

      {/* Commerce zone */}
      <div className="px-5 py-4 mt-2 flex items-center gap-3 border-t border-card-border">
        <div className="flex items-baseline gap-1 shrink-0">
          <span className="font-sans font-medium text-gold text-[0.95rem] tabular-nums">
            {price}
          </span>
          <span className="font-sans font-light text-gold-deep text-[0.62rem]">
            ر.س
          </span>
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ y: 1, filter: 'brightness(0.96)' }}
          className={`flex-1 py-2 text-[0.72rem] font-sans font-light tracking-[0.06em] rounded-md border transition-colors duration-300 ${
            added
              ? 'bg-gold text-page border-transparent'
              : 'border-card-border text-body hover:bg-gold hover:text-page hover:border-transparent'
          }`}
        >
          {added ? 'تمت الإضافة' : 'أضف للسلة'}
        </motion.button>
      </div>
    </motion.div>
  );
}

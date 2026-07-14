'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ShoppingCart, User } from 'lucide-react';

const NAV_LINKS = ['منتجاتنا', 'قصتنا', 'تواصل معنا'] as const;

export function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 80));

  // Colors animate with the page's cream → dark transition so nav text
  // stays legible the whole way down. (Logo red → gold once on dark.)
  const linkColor = useTransform(scrollY, [360, 640], ['#6B5040', '#C9B89B']);
  const iconColor = useTransform(scrollY, [360, 640], ['#2C1A12', '#D4A853']);
  const logoColor = useTransform(scrollY, [360, 640], ['#C0392B', '#D4A853']);
  const navBg     = useTransform(scrollY, [80, 640], ['rgba(20,12,6,0)', 'rgba(20,12,6,0.72)']);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 transition-[backdrop-filter,border-color] duration-500"
      style={{
        background: navBg,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,168,83,0.18)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Brand mark — the one place (besides hero title) red is allowed */}
        <motion.span
          style={{ color: logoColor }}
          className="font-display text-[1.5rem] select-none cursor-default tracking-[-0.01em]"
        >
          توليفة
        </motion.span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link}
              href="#"
              style={{ color: linkColor }}
              whileHover={{ opacity: 0.65 }}
              className="font-sans font-light text-sm tracking-[0.08em]"
            >
              {link}
            </motion.a>
          ))}
        </nav>

        {/* Actions — thin outline icons, no filled circle */}
        <div className="flex items-center gap-5">
          <motion.button
            style={{ color: iconColor }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            aria-label="حساب المستخدم"
          >
            <User size={18} strokeWidth={1.4} />
          </motion.button>

          <motion.button
            style={{ color: iconColor }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setCartCount((n) => n + 1)}
            className="relative"
            aria-label="سلة التسوق"
          >
            <ShoppingCart size={18} strokeWidth={1.4} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="absolute -top-1 -left-1 w-4 h-4 rounded-full text-[9px] font-sans font-medium flex items-center justify-center bg-gold text-page"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

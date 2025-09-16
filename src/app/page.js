
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroReact() {
  // SSR-safe width handling: initialize to a reasonable default and set actual width on mount
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // set initial width on mount
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = width < 768;
  const headerHeight = isMobile ? '88px' : '72px';
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'scroll',
      }}
    >
      {/* Blurred background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80) no-repeat center center/cover',
          filter: 'blur(6px)',
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      <header
        style={{
          width: '100%',
          padding: isMobile ? '12px 16px' : '16px 32px',
          height: headerHeight,
          boxSizing: 'border-box',
          background: scrolled ? 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' : 'rgba(40,44,52,0.95)',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: scrolled ? '0 4px 16px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.12)',
          transition: 'background 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          style={{
            width: isMobile ? '48px' : '60px',
            verticalAlign: 'middle',
            marginRight: isMobile ? '8px' : '16px',
            marginBottom: isMobile ? '8px' : 0,
            cursor: 'pointer',
            display: 'inline-block',
          }}
          whileHover={{ rotate: 90, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <span style={{ fontSize: isMobile ? '1.4rem' : '2.2rem', fontWeight: 700, letterSpacing: '2px' }}>React Hero Page</span>
      </header>

      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: headerHeight,
          paddingLeft: isMobile ? '12px' : '16px',
          paddingRight: isMobile ? '12px' : '16px',
          paddingBottom: '0px',
          position: 'relative',
          zIndex: 1,
        }}
      >

        <section
          style={{
            background: 'rgba(40,44,52,0.85)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            padding: isMobile ? '28px 18px' : '48px 32px',
            maxWidth: isMobile ? '92%' : '600px',
            textAlign: 'center',
            margin: isMobile ? '24px auto' : '48px auto 48px auto',
          }}
        >
          <h1 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '2px' }}>
            Welcome to React
          </h1>
          <p style={{ fontSize: isMobile ? '1rem' : '1.25rem', marginBottom: '32px', lineHeight: '1.6' }}>
            React is a powerful JavaScript library for building user interfaces. It makes creating interactive UIs painless and efficient, letting you design simple views for each state in your application.
          </p>
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#61dafb',
              color: '#282c34',
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(97,218,251,0.2)',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#21a1f3')}
            onMouseOut={e => (e.currentTarget.style.background = '#61dafb')}
          >
            Learn More
          </a>
        </section>

        {/* Key Features - interactive cards */}
        <KeyFeatures isMobile={isMobile} />

        {/* Stats - animated counters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: isMobile ? '92%' : '900px',
            margin: '32px auto',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '18px',
          }}
        >
          <Stat label="Downloads" value={1200000} isMobile={isMobile} />
          <Stat label="Stars" value={180000} isMobile={isMobile} />
          <Stat label="Companies" value={12000} isMobile={isMobile} />
        </motion.section>

        {/* Use cases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px' }}
        >
          <h2 style={{ color: '#61dafb', marginBottom: '12px' }}>Where React shines</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '12px' }}>
            {[
              'Single Page Apps',
              'Mobile apps (React Native)',
              'Compound UI components',
              'Dashboards',
              'Interactive visualizations',
              'Prototyping & Design Systems',
            ].map((t, i) => (
              <motion.div
                key={t}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  padding: '16px',
                  borderRadius: '10px',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 6px 18px rgba(2,6,23,0.12)'
                }}
              >
                <strong>{t}</strong>
                <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '0.95rem' }}>Common use cases and success stories.</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Ecosystem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px' }}
        >
          <h2 style={{ color: '#61dafb', marginBottom: '12px' }}>Ecosystem & Tools</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Next.js', 'Gatsby', 'React Native', 'Redux', 'Recoil', 'React Router'].map(name => (
              <motion.span
                key={name}
                whileHover={{ scale: 1.04 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >{name}</motion.span>
            ))}
          </div>
        </motion.section>

        {/* Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px' }}
        >
          <h2 style={{ color: '#61dafb', marginBottom: '12px' }}>Real-world Examples</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
            {[{ title: 'Twitter-like feed' }, { title: 'Interactive chart app' }, { title: 'E-commerce UI' }, { title: 'Design system' }].map((ex, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  padding: '16px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <strong>{ex.title}</strong>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem' }}>Short summary of the example and how React was used.</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ accordion */}
        <FAQSection isMobile={isMobile} />

        {/* CTA */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Ready to build with React?</h2>
          <p style={{ marginBottom: '12px' }}>Start small: create a component, add state, and render it. Scale later.</p>
          <motion.a whileHover={{ scale: 1.03 }} href="https://react.dev/learn" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#61dafb', color: '#282c34', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Start Learning</motion.a>
        </motion.section>

        <section
          style={{
            background: 'rgba(40,44,52,0.75)',
            borderRadius: '14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            padding: '28px 20px',
            maxWidth: '520px',
            margin: '0 auto 48px auto',
          }}
        >
          <h2 style={{ fontSize: '1.7rem', fontWeight: 600, marginBottom: '12px', color: '#61dafb' }}>Why Choose React?</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '0' }}>
            React is trusted by thousands of companies and developers worldwide. Its flexibility, performance, and vibrant ecosystem make it a top choice for building modern web applications.
          </p>
        </section>
      </div>

      <section
        style={{
          maxWidth: isMobile ? '92%' : '420px',
          margin: '24px auto',
          padding: '12px',
          position: 'relative',
          zIndex: 70,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'rgba(40,44,52,0.75)',
          padding: '12px 14px',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255,255,255,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.img
              src="https://img.icons8.com/ios/100/chatgpt.png"
              alt="ChatGPT"
              whileHover={{ rotate: 90, scale: 1 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
              style={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, borderRadius: 8, padding: 6 ,filter: 'invert(100%)'}}
            />
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>Chat</div>
          </div>

          <Link href="/chat">
            <motion.div whileHover={{ scale: 1.03 }} style={{ display: 'inline-block', background: '#10a37f', color: '#042a26', padding: '8px 14px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>
              Open Chat
            </motion.div>
          </Link>
        </div>
      </section>

      <footer
        style={{
          width: '100%',
          background: 'rgba(40,44,52,0.95)',
          color: '#e0e0e0',
          fontSize: '1rem',
          textAlign: 'center',
          padding: '24px 0 16px 0',
          marginTop: 'auto',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          Made with <span style={{ color: '#61dafb', fontWeight: 600 }}>React</span> &copy; {new Date().getFullYear()}
        </div>
        <div>
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#61dafb', textDecoration: 'underline', marginRight: '16px' }}
          >
            Official Docs
          </a>
          <a
            href="https://github.com/facebook/react"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#61dafb', textDecoration: 'underline' }}
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value, isMobile }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let rafId;
    let startTime = null;
    const duration = 1200; // faster duration in ms
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(eased * value);
      setCount(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <div style={{ textAlign: 'center', padding: isMobile ? '8px' : '12px' }}>
      <div style={{ fontSize: isMobile ? '1.2rem' : '1.6rem', fontWeight: 700 }}>{count.toLocaleString()}</div>
      <div style={{ opacity: 0.9 }}>{label}</div>
    </div>
  );
}

function FAQSection({ isMobile }) {
  const faqs = [
    { q: 'What is React?', a: 'React is a JavaScript library for building user interfaces.' },
    { q: 'Is React only for web?', a: 'No — with React Native you can build mobile apps.' },
    { q: 'How do I learn React?', a: 'Start with components and JSX, then move to state and hooks.' },
  ];

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, layout: { duration: 0.35, ease: 'easeOut' } }}
      style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px' }}
    >
      <h2 style={{ color: '#61dafb', marginBottom: '12px' }}>FAQ</h2>
      <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr', alignItems: 'stretch' }}>
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} isMobile={isMobile} />
        ))}
      </div>
    </motion.section>
  );
}

function FAQItem({ q, a, isMobile }) {
  const [open, setOpen] = useState(false);
  return (
      <motion.div
      layout
      style={{
        width: isMobile ? '100%' : '720px',
        minWidth: isMobile ? '100%' : '720px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        padding: '12px',
        borderRadius: '8px',
        cursor: 'pointer',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}
      onClick={() => setOpen(s => !s)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <strong style={{ flex: 1, textAlign: 'left' }}>{q}</strong>
        <span style={{ width: '28px', display: 'inline-block', textAlign: 'center', transform: open ? 'rotate(0deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>{open ? '−' : '+'}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: isMobile ? 800 : 220, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ marginTop: '8px', overflow: 'auto', paddingRight: '6px' }}
          >
            <div style={{ lineHeight: 1.6 }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function KeyFeatures({ isMobile }) {
  const [active, setActive] = useState(null);
  const cards = [
    { id: 1, title: 'Declarative', body: 'React makes it easy to create interactive UIs.' },
    { id: 2, title: 'Component-Based', body: 'Build encapsulated components that manage their own state.' },
    { id: 3, title: 'Virtual DOM', body: 'Efficiently updates and renders just the right components.' },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (active) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // keep scrollbar gutter stable when modal is not open
      document.body.style.overflowY = 'scroll';
      document.documentElement.style.overflowY = 'scroll';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    };
  }, [active]);

  return (
    <>
      <section
        style={{
          background: 'rgba(40,44,52,0.80)',
          borderRadius: '18px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          padding: '32px 24px',
          maxWidth: '900px',
          margin: '0 auto 48px auto',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '18px', color: '#61dafb' }}>Key Features</h2>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', padding: isMobile ? '8px' : '0' }}>
          {cards.map((card, i) => {
            const isActive = active === card.id;
            return (
              <motion.div
                key={card.id}
                onClick={() => setActive(isActive ? null : card.id)}
                layout
                layoutId={`card-${card.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(97,218,251,0.95), rgba(97,218,251,0.85))' : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  color: isActive ? '#082032' : '#fff',
                  padding: isMobile ? '16px' : '20px',
                  borderRadius: '12px',
                  width: isMobile ? '100%' : '260px',
                  minHeight: '120px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.4)' : '0 6px 18px rgba(2,6,23,0.12)',
                  border: isActive ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: isActive ? 'none' : 'blur(6px)',
                  WebkitBackdropFilter: isActive ? 'none' : 'blur(6px)'
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ delay: 0.18 * i + 0.08, duration: 0.56, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h3 style={{ marginTop: 0 }}>{card.title}</h3>
                <p style={{ marginBottom: 0 }}>{card.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Overlay modal when active */}
      {active && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4,8,12,0.55)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '24px',
          }}
          onClick={() => setActive(null)}
        >
          {/* Expanded card - shared layoutId for smooth transition */}
          <motion.div
            layoutId={`card-${active}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.90))',
              color: '#082032',
              padding: '32px',
              borderRadius: '16px',
              width: 'min(720px, 95vw)',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
              <div>
                <h2 style={{ marginTop: 0 }}>{cards.find(c => c.id === active).title}</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{cards.find(c => c.id === active).body}</p>
                <p style={{ marginTop: '12px', opacity: 0.95 }}>
                  More details about {cards.find(c => c.id === active).title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                </p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <button
                  onClick={() => setActive(null)}
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(0,0,0,0.08)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#082032',
                    fontWeight: 600,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}


"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div
      style={{
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      }}
    >
      {/* Blurred background image */}
      <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        // background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80) no-repeat center center/cover',
        filter: 'blur(6px)',
        opacity: 0.7,
      }}
      aria-hidden="true"
      />

      <header
      style={{
        width: '100%',
        padding: isMobile ? '12px 16px' : '16px 32px',
        background: 'rgba(40,44,52,0.95)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        zIndex: 2,
        position: 'relative',
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
        padding: isMobile ? '0px 12px' : '0px 16px',
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

function KeyFeatures({ isMobile }) {
  const [active, setActive] = useState(null);
  const cards = [
    { id: 1, title: 'Declarative', body: 'React makes it easy to create interactive UIs.' },
    { id: 2, title: 'Component-Based', body: 'Build encapsulated components that manage their own state.' },
    { id: 3, title: 'Virtual DOM', body: 'Efficiently updates and renders just the right components.' },
  ];

  useEffect(() => {
    if (active) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
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
          {cards.map(card => {
            const isActive = active === card.id;
            return (
              <motion.div
                key={card.id}
                onClick={() => setActive(isActive ? null : card.id)}
                layout
                layoutId={`card-${card.id}`}
                style={{
                  background: isActive ? '#61dafb' : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#082032' : '#fff',
                  padding: isMobile ? '16px' : '20px',
                  borderRadius: '12px',
                  width: isMobile ? '100%' : '260px',
                  minHeight: '120px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.15)',
                  border: isActive ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.03)',
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
              background: '#61dafb',
              color: '#082032',
              padding: '32px',
              borderRadius: '16px',
              width: 'min(720px, 95vw)',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
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

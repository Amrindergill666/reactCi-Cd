"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
    // SSR-safe width handling
    const [width, setWidth] = useState(1200);
    useEffect(() => {
        if (typeof window === 'undefined') return;
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
        <div style={{ minHeight: '100vh', color: '#fff', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Background - removed image, use subtle dark grayscale */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg,#0b0b0b,#111)', opacity: 1 }} aria-hidden="true" />

            <header
                style={{
                    width: '100%',
                    padding: isMobile ? '12px 16px' : '16px 32px',
                    height: headerHeight,
                    boxSizing: 'border-box',
                    background: scrolled ? 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))' : 'rgba(6,10,14,0.95)',
                    backdropFilter: scrolled ? 'blur(8px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
                    border: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    boxShadow: scrolled ? '0 6px 20px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.12)',
                    transition: 'background 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 9999,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <motion.img
                    src="https://img.icons8.com/ios/100/chatgpt.png"
                    alt="ChatGPT Logo"
                    style={{ width: isMobile ? '44px' : '56px', verticalAlign: 'middle', marginRight: '12px', cursor: 'pointer', filter: 'invert(100%)' }}
                    whileHover={{ rotate: 90, scale: 1 }}
                    transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
                />

                <span style={{ fontSize: isMobile ? '1.2rem' : '1.8rem', fontWeight: 700, letterSpacing: '1px', color: '#fff' }}>ChatGPT Hub</span>

                <Link href="/" style={{ color: '#10a37f', fontWeight: 700, textDecoration: 'none' }}>Home</Link>
            </header>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: headerHeight, position: 'relative', zIndex: 1 }}>

                <section style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRadius: '20px', padding: isMobile ? '28px 18px' : '48px 32px', maxWidth: isMobile ? '92%' : '720px', textAlign: 'center', margin: isMobile ? '20px auto' : '48px auto' }}>
                    <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.8rem', fontWeight: 800, color: '#10a37f', marginBottom: '12px' }}>Explore ChatGPT</h1>
                    <p style={{ fontSize: isMobile ? '1rem' : '1.15rem', lineHeight: 1.6, marginBottom: '22px', color: 'rgba(255,255,255,0.9)' }}>ChatGPT helps you draft, brainstorm, and prototype with conversational AI. Use it for writing, coding help, brainstorming, and more.</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                        <Link href="/chat">
                            <motion.div whileHover={{ scale: 1.03 }} style={{ display: 'inline-block', background: '#10a37f', color: '#042a26', padding: '12px 24px', borderRadius: '10px', fontWeight: 800 }}>Open Workspace</motion.div>
                        </Link>
                        <a href="https://chat.openai.com/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', color: '#cfcfcf', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', fontWeight: 600 }}>Open OpenAI</a>
                    </div>
                </section>

                <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ maxWidth: isMobile ? '92%' : '900px', margin: '28px auto', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', padding: '18px' }}>
                    <Stat label="Conversations" value={452000} isMobile={isMobile} color="#10a37f" />
                    <Stat label="Templates" value={1240} isMobile={isMobile} color="#7de7c6" />
                    <Stat label="Integrations" value={3200} isMobile={isMobile} color="#9ef0d3" />
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} style={{ maxWidth: isMobile ? '92%' : '900px', margin: '18px auto', padding: '18px' }}>
                    <h2 style={{ color: '#a7f3d0', marginBottom: '12px' }}>Where ChatGPT helps</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '12px' }}>
                        {['Drafting & Editing', 'Coding Assistance', 'Brainstorming', 'Education & Tutoring', 'Data Summaries', 'Idea Validation'].map((t, i) => (
                            <motion.div key={t} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 220 }} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                <strong style={{ color: '#fff' }}>{t}</strong>
                                <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>Common ways teams use conversational AI.</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }} style={{ maxWidth: isMobile ? '92%' : '900px', margin: '18px auto', padding: '18px' }}>
                    <h2 style={{ color: '#a7f3d0', marginBottom: '12px' }}>Examples</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
                        {[{ title: 'Email Composer' }, { title: 'Refactor Assistant' }, { title: 'Customer Replies' }, { title: 'Product Specs' }].map((ex, i) => (
                            <motion.div key={i} whileHover={{ y: -6 }} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                <strong style={{ color: '#fff' }}>{ex.title}</strong>
                                <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>Short summary of how ChatGPT helps with this task.</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <FAQSection isMobile={isMobile} />

                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.92)' }}>Ready to try ChatGPT?</h2>
                    <p style={{ marginBottom: '12px', color: 'rgba(255,255,255,0.9)' }}>Jump into the workspace and start a conversation — try a prompt, ask for code, or brainstorm ideas.</p>
                    <Link href="/chat">
                        <motion.div whileHover={{ scale: 1.03 }} style={{ display: 'inline-block', background: '#10a37f', color: '#042a26', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 800 }}>Open Workspace</motion.div>
                    </Link>
                </motion.section>

            </div>

            <footer style={{ width: '100%', background: '#070707', color: 'rgba(255,255,255,0.92)', fontSize: '1rem', textAlign: 'center', padding: '24px 0 16px 0', marginTop: 'auto', zIndex: 2, position: 'relative' }}>
                <div style={{ marginBottom: '8px' }}>Built with <span style={{ color: '#10a37f', fontWeight: 700 }}>ChatGPT</span> &copy; {new Date().getFullYear()}</div>
                <div>
                    <a href="https://openai.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline', marginRight: '16px' }}>OpenAI</a>
                    <a href="https://platform.openai.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>Platform</a>
                </div>
            </footer>
        </div>
    );
}

function Stat({ label, value, isMobile, color = '#10a37f' }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let rafId;
        let startTime = null;
        const duration = 1100;
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = Math.floor(eased * value);
            setCount(current);
            if (progress < 1) rafId = requestAnimationFrame(step);
            else setCount(value);
        };
        rafId = requestAnimationFrame(step);
        return () => { if (rafId) cancelAnimationFrame(rafId); };
    }, [value]);

    return (
        <div style={{ textAlign: 'center', padding: isMobile ? '8px' : '12px' }}>
            <div style={{ fontSize: isMobile ? '1.2rem' : '1.6rem', fontWeight: 800, color }}>{count.toLocaleString()}</div>
            <div style={{ opacity: 0.9 }}>{label}</div>
        </div>
    );
}

function FAQSection({ isMobile }) {
    const faqs = [
        { q: 'What is ChatGPT?', a: 'ChatGPT is a conversational AI developed by OpenAI that can assist with writing, coding, and problem solving.' },
        { q: 'Is my data saved?', a: 'OpenAI retains some data; check their privacy docs for details.' },
        { q: 'Can I integrate it?', a: 'Yes — use the OpenAI API to integrate ChatGPT into your apps.' },
    ];

    return (
        <motion.section layout initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, layout: { duration: 0.35, ease: 'easeOut' } }} style={{ maxWidth: isMobile ? '92%' : '900px', margin: '24px auto', padding: '18px' }}>
            <h2 style={{ color: '#a7f3d0', marginBottom: '12px' }}>FAQ</h2>
            <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr' }}>
                {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} isMobile={isMobile} />)}
            </div>
        </motion.section>
    );
}

function FAQItem({ q, a, isMobile }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div layout style={{ width: isMobile ? '100%' : '720px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(16,163,127,0.04), rgba(16,163,127,0.01))', padding: '12px', borderRadius: '8px', cursor: 'pointer', border: '1px solid rgba(167,243,208,0.04)' }} onClick={() => setOpen(s => !s)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ flex: 1, textAlign: 'left' }}>{q}</strong>
                <span style={{ width: '28px', textAlign: 'center' }}>{open ? '−' : '+'}</span>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: isMobile ? 800 : 220, opacity: 1 }} exit={{ maxHeight: 0, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} style={{ marginTop: '8px', overflow: 'auto' }}>
                        <div style={{ lineHeight: 1.6 }}>{a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

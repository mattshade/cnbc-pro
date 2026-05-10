import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { 
  ChevronRight, 
  Menu, 
  X, 
  Layers, 
  Layout, 
  Activity, 
  BookOpen, 
  Search,
  ZoomIn,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
  Target,
  Users,
  Smartphone,
  LockKeyhole
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'CASE STUDIES AND PROJECTS', href: 'https://mattshade.com/#projects' },
    { name: 'EXPERIENCE', href: 'https://mattshade.com/#experience' },
  ]

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a
          href="https://mattshade.com"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-accent">
            <path fill="currentColor" d="M 12 1 L 20 14 L 23 21 L 16 16 L 12 23 L 8 16 L 1 21 L 4 14 Z" />
            <circle cx="12" cy="10.5" r="3.2" fill="#ffffff" />
            <circle cx="12" cy="10.5" r="1.3" fill="#0a0a0b" />
          </svg>
          <span className="text-[16px] font-bold text-[#F3F4F6] tracking-tight whitespace-nowrap uppercase">
            Matt Shade
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-mono font-bold tracking-[0.2em] text-muted hover:text-accent transition-colors uppercase"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const ImageZoom = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="group relative">
      <div 
        className="relative overflow-hidden rounded-xl border border-border cursor-zoom-in bg-surface"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <ZoomIn className="w-6 h-6" />
          </div>
        </div>
      </div>
      {caption && <p className="mt-4 text-[10px] text-muted italic font-mono uppercase tracking-[0.2em]">{caption}</p>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setIsOpen(false)}
          >
            <motion.button 
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SectionHeader = ({ tag, title, description }: { tag: string, title: string, description?: string }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-block text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-4"
    >
      // {tag}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-6 text-gradient tracking-tight"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-muted max-w-2xl leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
)

// --- Main App ---

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isScriptOpen, setIsScriptOpen] = useState(false)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 transition-all duration-700">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-surface border border-border rounded-full shadow-2xl hover:bg-accent hover:text-background transition-all"
          >
            <ChevronRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-6 border border-accent/20">
                  Subscription Experience Case Study
                </span>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.95] tracking-tighter">
                  CNBC PRO <br/>
                  <span className="text-muted/40">Redesign</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-xl mb-10">
                  Redesigning the premium subscription journey for serious investors. A premium flow designed to reduce friction and help investors subscribe with confidence.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-border">
                  {[
                    { label: 'Company', value: 'CNBC' },
                    { label: 'Service', value: 'Product Design' },
                    { label: 'Role', value: 'Lead Designer' },
                    { label: 'Industry', value: 'Media/Finance' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[10px] uppercase tracking-widest text-muted mb-1 font-mono">{stat.label}</p>
                      <p className="font-medium text-sm">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-transparent blur-md opacity-30" />
                <img 
                  src="/images/668030c9c0b2dc0afa4203cf_pro-flow-a.png" 
                  alt="CNBC PRO Hero" 
                  className="rounded-2xl border border-border shadow-2xl relative z-10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Context & Challenge */}
      <section className="section-padding bg-surface/30">
        <div className="container-custom">
          <SectionHeader 
            tag="Context" 
            title="The Vision for PRO"
            description="CNBC PRO is the premier subscription service for financial news and analysis. My role was to rethink the entire acquisition funnel to drive conversion and retention."
          />
          
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { 
                title: 'Market Lead', 
                desc: 'CNBC PRO is a market leader in financial news, but the sign-up process was lagging behind modern standards.',
                icon: <Target className="w-6 h-6 text-accent" />
              },
              { 
                title: 'User Focus', 
                desc: 'We needed to understand the specific needs of "Susan", our archetype for the confident investor.',
                icon: <Users className="w-6 h-6 text-accent" />
              },
              { 
                title: 'Modern Stack', 
                desc: 'Moving from a legacy fragmented system to a cohesive, high-performance subscription model.',
                icon: <Smartphone className="w-6 h-6 text-accent" />
              }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-surface border border-border rounded-2xl hover:border-accent/30 transition-colors"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center pt-24 border-t border-border">
            <div className="lg:col-span-5">
              <SectionHeader 
                tag="Competitive Analysis" 
                title="Learning from the Best"
                description="We analyzed the subscription flows of major financial players to identify patterns that reduce friction and build trust."
              />
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  Analyzing our competitors revealed that transparency in billing and simplicity in account creation were the biggest drivers of conversion.
                </p>
                <p>
                  We focused on flows that felt premium yet accessible, ensuring the user always knew exactly what they were getting and how much they were paying.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ImageZoom 
                src="/images/667f7b7b00741aee88773dbc_CA-subflows2-p-3200.png" 
                alt="Competitive Analysis" 
                caption="Deep dive into financial subscription patterns"
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Profiles */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            tag="User Research" 
            title="Susan, the Confident Investor"
            description="Insights gathered from 16.5k users helped shape our subscriber profiles and provided clarity on valuable content."
          />
          
          <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
            <div className="lg:col-span-7">
              <ImageZoom src="/images/667f80580746e7957738e149_susan-profile.webp" alt="Susan Profile" caption="Archetype: The Confident Investor" />
            </div>
            <div className="lg:col-span-5">
              <div className="space-y-8">
                <div className="p-8 bg-surface border border-border rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users className="w-24 h-24" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">Susan's Persona</h3>
                  <p className="text-muted leading-relaxed mb-6">
                    Susan is an established investor who is confident in her strategy. She seeks high-level analysis and real-time insights to maintain her edge.
                  </p>
                  <ul className="space-y-3 text-sm text-muted">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Values clarity and speed
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Needs data-backed analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <SectionHeader 
            tag="JTBD" 
            title="Jobs to be Done"
            description="We identified the core functional and emotional needs of our users to align our redesign goals."
          />
          <div className="mb-24">
             <ImageZoom src="/images/667f8397f63d48d8d7a3d384_cnbc-pro-jtbd.webp" alt="Jobs To Be Done" caption="Mapping the subscription journey to user goals" />
          </div>
        </div>
      </section>

      {/* Entry Points & Flows */}
      <section className="section-padding bg-surface/30">
        <div className="container-custom">
          <SectionHeader 
            tag="The Journey" 
            title="Sign In & Subscription Experience"
            description="Collaborating with CX to identify friction points and map out the seamless transition from reader to subscriber."
          />
          
          <div className="bg-accent/[0.03] border border-accent/20 p-8 md:p-12 rounded-3xl mb-16">
            <h3 className="text-2xl font-bold mb-8 text-accent italic font-serif">"How might we offer a more seamless payment experience?"</h3>
            <div className="grid md:grid-cols-2 gap-8 text-muted">
              <p>We needed to meet users where they already are on the web, reducing the cognitive load of account creation.</p>
              <p>The goal was to make the barrier to entry as low as possible while maintaining a premium brand experience.</p>
            </div>
          </div>

          <ImageZoom 
            src="/images/667f93c8772202a8a9fab3a7_pro-entry-points.webp" 
            alt="Entry Points" 
            caption="Mapping various touchpoints across the CNBC ecosystem" 
          />
        </div>
      </section>

      {/* A/B Testing */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            tag="Testing" 
            title="Prototype Comparison"
            description="We tested two distinct pathways to find the perfect balance between speed and information density."
          />
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl inline-block text-accent text-[10px] font-mono font-bold tracking-widest">PATHWAY A</div>
              <h3 className="text-3xl font-bold">Single View Sign Up</h3>
              <p className="text-muted leading-relaxed">
                A consolidated view that presents value props, account creation, and billing in one smooth sequence.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  'Clear plan details and selection',
                  'Consolidated account & billing',
                  'Immediate verification feedback'
                ].map(item => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ImageZoom src="/images/668030c9c0b2dc0afa4203cf_pro-flow-a.png" alt="Prototype A" />
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl inline-block text-muted text-xs font-bold font-mono tracking-widest uppercase">PATHWAY B</div>
              <h3 className="text-3xl font-bold">Staggered Sign Up</h3>
              <p className="text-muted leading-relaxed">
                A multi-step process that focuses on one piece of information at a time to reduce initial cognitive load.
              </p>
               <ul className="space-y-4 pt-4">
                {[
                  'Progress indicators for clarity',
                  'Focus on account first, billing second',
                  'Succinct email-only confirmation'
                ].map(item => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <CheckCircle2 className="w-5 h-5 text-muted shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ImageZoom src="/images/668030c9595e54be6df8dd93_pro-flow-b.png" alt="Prototype B" />
            </div>
          </div>
        </div>
      </section>

      {/* Research Artifact */}
      <section className="section-padding bg-accent/[0.02]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <SectionHeader 
                tag="Research" 
                title="Validating Our Direction"
                description="We conducted moderated sessions with financial news readers to see which flow resonated most with their mental model."
              />
              <div className="grid grid-cols-1 gap-4 mb-8">
                 {[
                  { metric: '5 of 6', text: 'Chose the single view style Sign Up' },
                  { metric: '6 of 6', text: 'Preferred comparison tables' },
                  { metric: '5 of 6', text: 'Liked having a progress bar' },
                ].map((stat, i) => (
                  <div key={i} className="bg-surface border border-border p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-accent mb-1">{stat.metric}</div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest">{stat.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
               <motion.div 
                onClick={() => setIsScriptOpen(true)}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl border border-accent/20 bg-surface p-12 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-500 hover:border-accent/40"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileText className="w-16 h-16 text-accent mb-6" />
                <h4 className="text-2xl font-bold mb-2">Moderator Testing Script</h4>
                <p className="text-muted text-sm uppercase tracking-[0.2em] mb-8">Research Artifact</p>
                <div className="px-8 py-3 bg-accent text-background rounded-full font-bold text-sm">
                  View Full Script
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution & Brand */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            tag="The Solution" 
            title="The End Design"
            description="Consolidated Single View Sign Up implemented in a seamless modal experience."
          />
          
          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <div className="space-y-12">
              <div className="p-10 bg-surface border border-border rounded-3xl">
                <h3 className="text-2xl font-bold mb-6">Modal Window Experience</h3>
                <p className="text-muted leading-relaxed">
                  We chose a modal window to provide a seamless subscription experience. This ensures users can subscribe without interruption, and locked PRO articles unlock immediately.
                </p>
              </div>
              <ImageZoom src="/images/66806fd548f9deebd061c39a_pro-fnl-4.webp" alt="Mobile Optimization" caption="Seamless experience across all breakpoints" />
            </div>
            <div className="space-y-12">
              <ImageZoom src="/images/66806fd3228e181980149dc6_pro-fnl-1.webp" alt="Final Design" caption="Refined billing and account creation" />
              <div className="p-10 bg-surface border border-border rounded-3xl">
                <h3 className="text-2xl font-bold mb-6">Cohesive Progression</h3>
                <p className="text-muted leading-relaxed">
                   Stepped progression and clear feedback throughout the journey ensures users feel in control and informed.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <SectionHeader 
                tag="Brand System" 
                title="Architectural Lime"
                description="Differentiating PRO from standard CNBC blue through a palette that represents growth and premium access."
              />
              <p className="text-muted leading-relaxed">
                The shift to a green-based palette (Growth Green) was designed to create an exclusive look and feel, signaling to the user that they are entering a premier financial space.
              </p>
            </div>
            <div className="lg:col-span-7">
               <ImageZoom src="/images/66806fd54f8661617a2f8a7b_pro-fnl-2.webp" alt="Brand System" caption="Defined color system for PRO content" />
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-padding bg-surface/30">
        <div className="container-custom">
          <SectionHeader 
            tag="Impact" 
            title="Making it Count"
            description="Tracking performance through hard metrics: Churn, Conversion, and Payment Adoption."
          />
          
          <div className="grid md:grid-cols-2 gap-12 mb-24">
             <div className="space-y-8">
               <div className="p-10 bg-surface border border-border rounded-3xl">
                 <div className="text-5xl font-bold text-accent mb-4">12%</div>
                 <h4 className="text-xl font-bold mb-2">Conversion Increase</h4>
                 <p className="text-sm text-muted">Early Q1 data showed a significant bump in successful sign-ups compared to the previous model.</p>
               </div>
               <div className="p-10 bg-surface border border-border rounded-3xl">
                 <div className="text-5xl font-bold text-accent mb-4">23%</div>
                 <h4 className="text-xl font-bold mb-2">Alternative Payments</h4>
                 <p className="text-sm text-muted">PayPal and modern payment options quickly became a staple for new daily subscriptions.</p>
               </div>
             </div>
             <ImageZoom src="/images/6680b99e228e1819803e0ad8_pro-funnel.webp" alt="Funnel Analytics" caption="Real-time performance tracking via DOMO" />
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center pt-24 border-t border-border">
             <div className="lg:col-span-7">
               <ImageZoom src="/images/6680b33f9ca956d2d9f8e62d_pro-gain.webp" alt="Growth" />
             </div>
             <div className="lg:col-span-5">
               <h3 className="text-3xl font-bold mb-6">Long-term Growth</h3>
               <p className="text-muted leading-relaxed">
                 By Q3, the model demonstrated sustained growth in both new and active subscribers, proving the durability of the frictionless experience.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section className="section-padding">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <LockKeyhole className="w-16 h-16 text-accent mx-auto mb-12 opacity-50" />
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">Lessons Learned</h2>
          <p className="text-xl text-muted leading-relaxed mb-16">
            Work on PRO has transitioned to new product initiatives aimed at enhancing the overall value proposition. Identifying areas for further improvement in account creation and billing remains a core focus for the team.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Optimization', text: 'Potential remains for streamlining the account creation even further.' },
              { title: 'Flexibility', text: 'The system is now capable of scaling to new product offerings easily.' },
              { title: 'Insights', text: 'Monitoring the funnel is crucial for identifying long-term bottlenecks.' }
            ].map(item => (
              <div key={item.title} className="p-8 bg-surface border border-border rounded-2xl">
                <h4 className="font-bold mb-3">{item.title}</h4>
                <p className="text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-border bg-surface/20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <h3 className="text-4xl font-bold mb-8 tracking-tighter text-gradient">let's create together!</h3>
              <a href="mailto:hellomattshade@gmail.com" className="text-xl hover:text-accent transition-colors font-mono tracking-tight">hellomattshade@gmail.com</a>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              <a href="https://mattshade.com" className="text-xs uppercase tracking-widest text-muted hover:text-accent">Home</a>
              <a href="https://mattshade.com/contact" className="text-xs uppercase tracking-widest text-muted hover:text-accent">contact</a>
              <a href="https://linkedin.com/in/mattshade" className="text-xs uppercase tracking-widest text-muted hover:text-accent">linkedin</a>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-border flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-muted">
            <span>© {new Date().getFullYear()} Matt Shade</span>
            <span>CNBC PRO REDESIGN</span>
          </div>
        </div>
      </footer>

      {/* Artifact Modal */}
      <AnimatePresence>
        {isScriptOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12" onClick={() => setIsScriptOpen(false)}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between p-4 border-b border-border bg-surface-light">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">UX_RESEARCH_SCRIPT.pdf</span>
                </div>
                <button onClick={() => setIsScriptOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-8 bg-background">
                <div className="max-w-3xl mx-auto space-y-12">
                   <div className="border-b border-border pb-8">
                    <h1 className="text-3xl font-bold mb-2">CNBC PRO Sign Up Flow Test</h1>
                    <p className="text-accent uppercase tracking-widest text-[10px] font-mono font-bold">// Moderator Script & Methodology</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-accent font-mono text-[10px] uppercase">// Goal</h4>
                      <p className="text-sm text-muted leading-relaxed">Compare ease of use between single-view and staggered sign-up flows.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-accent font-mono text-[10px] uppercase">// Hypothesis</h4>
                      <p className="text-sm text-muted leading-relaxed">The new flows are more intuitive, scalable, and reduce friction significantly.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-accent font-mono text-[10px] uppercase">// Task Questions</h4>
                    <div className="space-y-4 text-sm text-muted">
                      <p>1. Open Design A: Sign up for the annual subscription. Describe what you see.</p>
                      <p>2. How easy was it to understand the 2 options?</p>
                      <p>3. How organized is the layout?</p>
                      <p>4. Do you feel you successfully subscribed?</p>
                    </div>
                  </div>

                  <div className="p-8 bg-surface border border-accent/20 rounded-xl">
                    <p className="italic text-sm leading-relaxed">"The subscription offerings create an emotional investment... I like to have the confirmation."</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

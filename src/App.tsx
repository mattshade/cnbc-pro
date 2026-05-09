import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  LayoutTemplate,
  Target,
  Users,
  Search,
  CheckCircle2,
  Smartphone,
  LockKeyhole,
  Move, 
  ZoomIn, 
  ZoomOut,
  FileText,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';

// --- COMPONENTS ---

const ZoomableImage = ({ src, alt, scale = 1.8, allowPan = true }: { src: string, alt: string, scale?: number, allowPan?: boolean }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsZoomed(!isZoomed)}
          className="gap-2 text-xs h-8"
        >
          {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          {isZoomed ? 'Zoom Out' : 'Zoom In'}
        </Button>
      </div>
      
      <div 
        className={cn(
          "relative rounded-xl border border-border bg-secondary/20 w-full overflow-hidden transition-all duration-500",
          isZoomed ? "h-[60vh] md:h-[70vh]" : "h-auto cursor-zoom-in"
        )}
        onClick={() => !isZoomed && setIsZoomed(true)}
      >
        <div className={cn("w-full h-full flex items-center justify-center origin-center", !isZoomed && "pointer-events-none")}>
           <motion.img
             src={src}
             alt={alt}
             drag={isZoomed && allowPan}
             dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
             dragElastic={0}
             whileDrag={{ cursor: "grabbing" }}
             animate={{ 
               scale: isZoomed ? scale : 1,
               x: isZoomed ? undefined : 0,
               y: isZoomed ? undefined : 0,
             }}
             transition={{ duration: 0.3, ease: "easeOut" }}
             className={cn("w-full max-w-none origin-center", isZoomed && allowPan ? "cursor-grab" : "transition-shadow")}
             draggable={false}
           />
        </div>
        
        {isZoomed && allowPan && (
          <div className="absolute top-4 left-0 right-0 pointer-events-none flex justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
            <div className="bg-background/80 backdrop-blur rounded-full px-4 py-2 shadow-xl flex items-center gap-2">
              <Move className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">Click and drag to explore</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SECTIONS ---

const Hero = () => (
  <section className="min-h-[90vh] flex flex-col justify-center py-20 relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 max-w-4xl"
    >
      <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
        Case Study
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
        CNBC PRO <span className="text-muted-foreground block mt-2">Subscription Experience</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
        Redesigning the premium subscription journey for serious investors. A premium flow designed to reduce friction, clarify value, and help investors subscribe with confidence.
      </p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16"
    >
      {[
        { label: 'Company', value: 'CNBC' },
        { label: 'Product', value: 'CNBC PRO' },
        { label: 'Role', value: 'Senior Interactive Designer' },
        { label: 'Focus', value: 'Subscription UX & Systems' },
      ].map((meta, i) => (
        <div key={i} className="flex flex-col space-y-1 border-l border-border pl-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{meta.label}</span>
          <span className="text-sm font-medium text-foreground">{meta.value}</span>
        </div>
      ))}
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-20 relative w-full h-[400px] md:h-[600px] rounded-2xl border border-border/50 bg-secondary/30 overflow-hidden flex items-center justify-center backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
      <img src="/images/6680bb8eace5ea17adeb8278_pro-cover3.webp" alt="CNBC PRO Cover" className="w-full h-full object-cover opacity-80" />
      <div className="absolute bottom-10 left-10 z-20 max-w-sm">
        <Card className="bg-background/90 backdrop-blur border-primary/30">
          <CardContent className="p-4 flex gap-4 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-foreground">
              A premium subscription flow designed to reduce friction, clarify value, and help serious investors subscribe with confidence.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  </section>
);

const ContextSection = () => (
  <section className="py-20 border-t border-border">
    <div className="grid md:grid-cols-2 gap-16">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Overview & Challenge</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I led the redesign of the Sign In, Sign Up, and Registration processes for CNBC PRO to increase new subscriptions and reduce churn. I began by mapping out the existing user experience and identifying issues. Next, I collaborated with the internal CX team to gather complaints and feedback. Finally, I analyzed premium subscription flows from competitors to inform our decisions and ensure our design was competitive and user-friendly.
        </p>
      </div>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">The Opportunity</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          From January to March 2020, subscriber numbers rose by 190%, showing strong interest. This led us to enhance our product's value proposition to create an essential daily financial tool and revitalize the PRO subscription. Our goal was to grow subscriptions from 18k to 100k in three years, a 400% increase. We aimed to set CTR and conversion goals, overhaul the technical infrastructure, implement a new identity management system, and streamline the PRO subscription and sign-in process to reduce friction.
        </p>
      </div>
    </div>
  </section>
);

const ChallengeCards = () => (
  <section className="py-20">
    <div className="mb-12">
      <h2 className="text-3xl font-bold">CX Feedback & Heuristic Findings</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        I collaborated closely with the CX team to gather insights and identify pain points. Their support was invaluable in understanding user complaints and feedback, which informed our approach to redesigning and enhancing the overall experience.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        { title: 'Scattered Value', desc: 'No clear value proposition to the customer. Information was spread over marketing pages and not at the point of purchase.', icon: LayoutTemplate },
        { title: 'Plan Adjustments', desc: 'Adjusting plan selection during checkout flow was hard for users to see.', icon: Search },
        { title: 'Dead-ends', desc: 'Users who accidentally went into Sign In could not easily correct to access Sign Up modal.', icon: Users },
        { title: 'Mobile Degradation', desc: 'Not mobile friendly, forcing an experience that cutoff CTA and pertinent information to the user.', icon: Smartphone },
        { title: 'Weak Trust', desc: 'Purchase flow abruptly closed, an email was sent but there was not a confirmation of the purchase real-time in the flow.', icon: ShieldCheck },
        { title: 'Inconsistent UI', desc: 'Existing Subscription flow built on older tech-stack. Look and feel not consistent with design of CNBC.COM, no parity with CNBC app.', icon: Target },
      ].map((card, i) => (
        <Card key={i} className="bg-secondary/20 border-border/50 hover:border-primary/50 transition-colors">
          <CardHeader>
            <card.icon className="w-8 h-8 text-primary mb-4" />
            <CardTitle className="text-lg">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{card.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    
    <div className="mt-16 space-y-16">
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Mapping the existing experience</h3>
        <p className="text-muted-foreground">CNBC Pro user journey flow. Click to zoom and drag to explore the timeline.</p>
        <ZoomableImage src="/images/667f754f54fd8006e65a8124_pro-flow.png" alt="CNBC Pro user journey flow" scale={1.55} allowPan={true} />
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Competitive Analysis</h3>
        <p className="text-muted-foreground">CNBC Pro competitive analysis. Click to zoom and drag to explore competitors.</p>
        <ZoomableImage src="/images/667f7b7b00741aee88773dbc_CA-subflows2-p-3200.png" alt="Competitive analysis" scale={2.0} allowPan={true} />
      </div>
    </div>
  </section>
);

const UserProfiles = () => {
  const [isPersonaZoomed, setIsPersonaZoomed] = useState(false);

  useEffect(() => {
    if (isPersonaZoomed) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [isPersonaZoomed]);

  return (
    <section className="py-20 border-t border-border">
      <div className="mb-12">
        <h2 className="text-3xl font-bold">Exploring Pro user profiles: Part 1</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Understanding what drives user interest in PRO was pivotal in optimizing the subscription flow. We explored what attracts users to our product and what they seek. Categories for potential subscriber concepts were identified through a Qualtrics survey sent to 16.5k users. Insights gathered from responses helped shape our subscriber profiles and provided clarity on the investment-related content our audience finds valuable enough to subscribe to.
        </p>
      </div>

      <div className="space-y-16">
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Jobs to Be Done (JTBD)</h3>
          <div className="rounded-xl overflow-hidden border border-border bg-secondary/20 p-4">
             <img src="/images/667f8397f63d48d8d7a3d384_cnbc-pro-jtbd.webp" alt="JTBD" className="w-full h-auto rounded-lg" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Susan, the confident investor</h3>
            <p className="text-muted-foreground">
              Susan is an established investor who is confident in her investing strategy and approach. She finds value in insights and analysis.
            </p>
          </div>
          <div 
            className="rounded-xl border border-border bg-secondary/20 p-4 shadow-lg cursor-pointer transition-colors duration-300 hover:border-primary/40 relative z-10"
            onClick={() => setIsPersonaZoomed(true)}
          >
            <motion.img 
              layoutId="persona-susan"
              src="/images/667f80580746e7957738e149_susan-profile.webp" 
              alt="Persona" 
              className={cn("w-full h-auto rounded-lg origin-center", isPersonaZoomed ? "opacity-0" : "opacity-100")}
              whileHover={{ scale: isPersonaZoomed ? 1 : 1.02 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPersonaZoomed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 cursor-pointer" onClick={() => setIsPersonaZoomed(false)}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.img 
              layoutId="persona-susan"
              src="/images/667f80580746e7957738e149_susan-profile.webp" 
              alt="Persona" 
              className="w-full max-w-4xl h-auto rounded-xl shadow-2xl relative z-10"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SigninFlows = () => (
  <section className="py-20 border-t border-border">
    <div className="mb-12 space-y-6">
      <h2 className="text-3xl font-bold">Sign In and subscription experience flows: Part 2</h2>
      <p className="text-muted-foreground text-lg">
        I collaborated closely with the CX team to gather insights and identify pain points. Their support was invaluable in understanding user complaints and feedback, which informed our approach to redesigning and enhancing the overall experience.
      </p>
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
        <ul className="space-y-2 text-lg font-medium">
          <li>How might we improve our acquisition and retention rates by meeting users where they already are on the web?</li>
          <li>How might we offer a more seamless payment experience?</li>
        </ul>
      </div>
    </div>
    
    <div className="space-y-6">
      <h3 className="text-xl font-bold">CNBC Entry Points</h3>
      <p className="text-muted-foreground">
        Touch points showing the various entry points for the PRO flow. This includes paths for existing users and new users. Blue color represents the flows I focused on and designed.
      </p>
      <div className="rounded-xl overflow-hidden border border-border bg-secondary/20 p-4">
        <img src="/images/667f93c8772202a8a9fab3a7_pro-entry-points.webp" alt="Entry Points" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  </section>
);

const PrototypeComparison = () => {
  const [zoomedImage, setZoomedImage] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    if (zoomedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [zoomedImage]);

  return (
    <section className="py-20 border-t border-border">
      <div className="mb-12">
        <h2 className="text-3xl font-bold">Conduct A/B testing on two pathways</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          We need to consider several critical steps: initial account creation, plan selection, and billing checkout. While this flow is fairly standard, our goal is to establish a seamless process for users. We have identified two prototypes for testing, each taking a different approach to the sign-up process.
        </p>
      </div>

      <div className="space-y-20">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-primary">A: One (single) view sign up</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span><strong>(A.1)</strong> The value prop is laid out clearly for the user with details about the plan, with choice selections between monthly and annual subscriptions.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span><strong>(A.2)</strong> The next step includes plan confirmation, account creation and billing in a single view.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span><strong>(A.3)</strong> Closing step shows confirmation of the purchase. Users email address and order number provide verification of the purchase.</span>
              </li>
            </ul>
          </div>
          <div 
            className="rounded-xl border border-border bg-secondary/20 p-4 order-1 md:order-2 shadow-lg cursor-pointer transition-colors duration-300 hover:border-primary/40 relative z-10"
            onClick={() => setZoomedImage('A')}
          >
            <motion.img 
              layoutId="prototype-a"
              src="/images/668030c9c0b2dc0afa4203cf_pro-flow-a.png" 
              alt="Prototype A" 
              className={cn("w-full h-auto rounded-lg origin-center", zoomedImage === 'A' ? "opacity-0" : "opacity-100")}
              whileHover={{ scale: zoomedImage === 'A' ? 1 : 1.02 }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div 
            className="rounded-xl border border-border bg-secondary/20 p-4 shadow-lg cursor-pointer transition-colors duration-300 hover:border-primary/40 relative z-10"
            onClick={() => setZoomedImage('B')}
          >
            <motion.img 
              layoutId="prototype-b"
              src="/images/668030c9595e54be6df8dd93_pro-flow-b.png" 
              alt="Prototype B" 
              className={cn("w-full h-auto rounded-lg origin-center", zoomedImage === 'B' ? "opacity-0" : "opacity-100")}
              whileHover={{ scale: zoomedImage === 'B' ? 1 : 1.02 }}
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-muted-foreground">B: Staggered Sign Up</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
                <span><strong>(B.1)</strong> This version first focuses on the Sign Up creation, progress indicators show how many steps the user will encounter.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
                <span><strong>(B.2)</strong> The next step focuses on the plan selection with billing.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
                <span><strong>(B.3)</strong> Closing is more succinct with only an email confirmation.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 cursor-pointer" onClick={() => setZoomedImage(null)}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.img 
              layoutId={zoomedImage === 'A' ? "prototype-a" : "prototype-b"}
              src={zoomedImage === 'A' ? "/images/668030c9c0b2dc0afa4203cf_pro-flow-a.png" : "/images/668030c9595e54be6df8dd93_pro-flow-b.png"} 
              alt={`Prototype ${zoomedImage}`} 
              className="w-full max-w-4xl h-auto rounded-xl shadow-2xl relative z-10"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const scriptQuestions = [
  { id: 1, text: "Open the Design A by clicking on this link:", response: null },
  { id: 2, text: "You are in an article page that can only be viewed by users with a CNBC PRO subscription account. Sign up for the annual subscription option of CNBC PRO. Please describe what you are seeing and doing.", response: "[Verbal Response]" },
  { id: 3, text: "How easy was it to understand that there are 2 subscription options?", response: "[5 Point rating scale: Very difficult — Very easy]" },
  { id: 4, text: "Why did you choose this rating?", response: "[Verbal Response]" },
  { id: 5, text: "How organized is the layout of the subscription form?", response: "[5 Point rating scale: Very disorganized — Very organized]" },
  { id: 6, text: "Why did you choose this rating?", response: "[Verbal Response]" },
  { id: 7, text: "How easy or difficult is it to subscribe?", response: "[5 Point rating scale: Very difficult — Very easy]" },
  { id: 8, text: "Why did you choose this rating?", response: "[Verbal Response]" },
  { id: 9, text: "After going through the sign up and payment steps, do you feel like you were able to successfully subscribe to CNBC PRO?", response: "[5 Point rating scale: Yes, absolutely — No, not at all]" },
  { id: 10, text: "Why did you choose this rating?", response: "[Verbal Response]" }
];

const wrapUpTasks = [
  { title: "Wrap Up 1", text: "Which of the designs was most successful in enabling you to complete the stated task of subscribing to CNBC PRO? Why?", response: "[Verbal Response]" },
  { title: "Wrap Up 2", text: "Is there anything else you would like to add about your experience? Do you have any other feedback, thoughts, concerns, or guidance you would like to share?", response: "[Verbal Response]" },
];

const TestingResults = () => {
  const [isScriptOpen, setIsScriptOpen] = useState(false);

  useEffect(() => {
    if (isScriptOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [isScriptOpen]);

  return (
    <section className="py-20">
      <div className="bg-secondary/10 rounded-3xl p-8 md:p-12 border border-border">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Validating our direction: Part 3</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Test Participants</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong>Testers:</strong> Financial News Readers</li>
              <li><strong>Gender:</strong> 4 females and 2 males</li>
              <li><strong>Age:</strong> 32-69</li>
              <li><strong>Device:</strong> Desktop / Figma</li>
            </ul>
          </div>
          
          <motion.div 
            onClick={() => setIsScriptOpen(true)}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative rounded-2xl border border-primary/30 bg-primary/5 p-8 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 hover:bg-primary/10 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 min-h-[280px]"
          >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating Icon */}
            <div className="relative z-10 mb-6 p-5 bg-primary/10 rounded-2xl border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
              <FileText className="w-12 h-12 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]" />
            </div>

            <div className="relative z-10 text-center">
              <h4 className="text-2xl font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">Moderator Testing Script</h4>
              <p className="text-sm text-muted-foreground font-medium opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Research Artifact</p>
            </div>

            {/* View Button Overlay */}
            <div className="mt-8 relative z-10 flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-primary/25">
              <span>View Artifact</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 m-4 rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 m-4 rounded-br-lg" />
            
            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { metric: '5 of 6', text: 'Chose the single view style Sign Up' },
            { metric: '6 of 6', text: 'Preferred the comparison table before moving along' },
            { metric: '5 of 6', text: 'Liked having a progress bar' },
          ].map((stat, i) => (
            <div key={i} className="bg-background rounded-xl p-6 border border-border shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">{stat.metric}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.text}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            '“The subscription offerings creates an emotional investment, it generates a response and makes me to want to do it.”',
            '“I like to have the confirmation, the order number is very helpful in the event I do not receive my email.”',
            '“I would be less inclined to give my email early in the process.”'
          ].map((quote, i) => (
            <div key={i} className="pl-4 border-l-2 border-primary italic text-muted-foreground text-sm">
              {quote}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isScriptOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 perspective-1000" onClick={() => setIsScriptOpen(false)}>
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm tracking-wide">UX_RESEARCH_SCRIPT_v2.pdf</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsScriptOpen(false)} className="rounded-full h-8 w-8 hover:bg-primary/20">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-neutral-50 dark:bg-zinc-950 flex justify-center">
                <div className="w-full max-w-3xl bg-card border border-border/50 shadow-sm rounded-xl p-8 md:p-12 space-y-10 text-left">
                  
                  <div className="border-b border-border pb-6">
                    <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">CNBC PRO Sign Up Flow Test</h1>
                    <p className="text-primary uppercase tracking-widest text-xs font-bold">Moderator Script & Methodology</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">Goal:</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">Compare the ease of use of 2 different sign up flows:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Which enables a user to effectively sign up.</li>
                        <li>Which creates less sign up friction.</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">Hypothesis:</h2>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Current sign up flow is fragmented and confusing.</li>
                        <li>The new flow options are more intuitive and seamless.</li>
                        <li>The new flows are more scalable and can also accommodate different offerings and payment options.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">Questions:</h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Which design is the most effective in allowing users to sign up and subscribe for PRO?</li>
                      <li>Are the new flows intuitive?</li>
                      <li>Is one flow more effective in converting the user than the other?</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/30 p-6 rounded-xl border border-primary/10">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Testing Platform & Targeting</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div><strong className="text-primary block mb-1 text-xs uppercase">Platform:</strong><span className="text-muted-foreground text-sm">Usertesting.com</span></div>
                      <div><strong className="text-primary block mb-1 text-xs uppercase">Method:</strong><span className="text-muted-foreground text-sm">Qualitative & quantitative</span></div>
                      <div><strong className="text-primary block mb-1 text-xs uppercase">Participants:</strong><span className="text-muted-foreground text-sm">Panel (6 Desktop)</span></div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <strong className="text-primary text-xs uppercase mr-2">Screening criteria:</strong> 
                      <span className="text-muted-foreground text-sm">General news readers (already created in UserTesting)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Task Flow</h2>
                    <p className="text-muted-foreground text-sm">We will have users walk through the following tasks with all 3 homepage designs, then reflect on their experience.</p>
                    <ul className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground font-medium">
                      <li>Mock-up of current design will be presented first.</li>
                      <li>Prototypes A & B will be presented after and randomized for a balanced comparison.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Introduction</h2>
                    <p className="text-foreground text-sm leading-relaxed italic bg-primary/5 p-5 rounded-lg border border-primary/20">
                      "Today you will be providing feedback on 2 different designs to subscribe to CNBC PRO, which is a premium subscription service offering market insights. Please note that this is a wireframe prototype with very limited functionality. Some of the information, like name and credit card number, might be auto-populated as you progress through the tasks."
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-end justify-between border-b border-border pb-2">
                      <h2 className="text-xl font-bold text-foreground">Tasks: Prototypes A & B</h2>
                      <p className="text-xs text-muted-foreground font-mono">(Randomized via balance comparison)</p>
                    </div>

                    <div className="space-y-4">
                      {scriptQuestions.map((q) => (
                        <div key={q.id} className="bg-secondary/10 p-4 rounded-lg border border-border/50">
                          <p className="font-medium text-foreground text-sm mb-2"><span className="text-primary mr-2">{q.id}.</span>{q.text}</p>
                          {q.response && (
                            <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded border border-border/50 inline-block">{q.response}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">Wrap-up Tasks</h2>
                    <div className="space-y-4">
                      {wrapUpTasks.map((t, i) => (
                        <div key={i} className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{t.title}</h3>
                          <p className="font-medium text-foreground text-sm mb-3">{t.text}</p>
                          <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded border border-border/50 inline-block">{t.response}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FinalSolution = () => (
  <section className="py-20">
    <div className="mb-12">
      <h2 className="text-3xl font-bold">End design: Part 4</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        Based on our testing results, we decided to implement a consolidated Single View Sign Up for PRO Subscribe. Moving forward, we will continue to gather and incorporate user feedback to refine this approach. Our next objective was to define the distinct look and feel of PRO, distinguishing it from the standard CNBC product.
      </p>
    </div>
    
    <div className="space-y-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Modal Window Experience</h3>
          <p className="text-muted-foreground">
            We chose a modal window to provide a seamless subscription experience. This ensures users can subscribe without interruption, and locked PRO articles unlock immediately upon purchase, allowing continuous reading.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-border p-4 bg-secondary/20">
          <img src="/images/66806fd3228e181980149dc6_pro-fnl-1.webp" alt="Modal Screen" className="w-full h-auto rounded-lg" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-xl overflow-hidden border border-border p-4 bg-secondary/20">
          <img src="/images/66806fd548f9deebd061c39a_pro-fnl-4.webp" alt="Mobile Examples" className="w-full h-auto rounded-lg" />
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Mobile Optimization</h3>
          <p className="text-muted-foreground">
            Incorporating all of our feedback from our users and applying our guiding principles stated earlier. Our mobile version had to be flexible and clearly provide all the benefits of our value prop.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-center">
        <h3 className="text-xl font-bold">Cohesive Modals</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          These modals featured stepped progression and confirmation, focusing on providing feedback to the user throughout the journey.
        </p>
        <div className="rounded-xl overflow-hidden border border-border p-4 bg-secondary/20">
          <img src="/images/66806fd4205ea4d50df00480_pro-fnl-3.webp" alt="Cohesive Modals" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

const BrandSystem = () => {
  const [zoomedImage, setZoomedImage] = useState(false);

  useEffect(() => {
    if (zoomedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [zoomedImage]);

  return (
    <section className="py-20 border-t border-border">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Brand Style</h2>
          <p className="text-muted-foreground text-lg">
            Color system for PRO themed content was designed to create an exclusive look and feel and to differentiate itself from the standard CNBC blue. The green represents growth and rebirth, something we want to emphasize with our premium content that gives our customer a financial edge.
          </p>
        </div>
        <div 
          className="rounded-xl border border-border p-4 bg-secondary/10 shadow-lg cursor-pointer transition-colors duration-300 hover:border-primary/40 relative z-10"
          onClick={() => setZoomedImage(true)}
        >
          <motion.img 
            layoutId="pro-styleguide"
            src="/images/66806fd54f8661617a2f8a7b_pro-fnl-2.webp" 
            alt="Brand Style" 
            className={cn("w-full h-auto rounded-lg origin-center", zoomedImage ? "opacity-0" : "opacity-100")}
            whileHover={{ scale: zoomedImage ? 1 : 1.02 }}
          />
        </div>
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 cursor-pointer" onClick={() => setZoomedImage(false)}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.img 
              layoutId="pro-styleguide"
              src="/images/66806fd54f8661617a2f8a7b_pro-fnl-2.webp" 
              alt="Brand Style Zoomed" 
              className="w-full max-w-5xl h-auto rounded-xl shadow-2xl relative z-10"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PaymentScaling = () => {
  const [zoomedImage, setZoomedImage] = useState(false);

  useEffect(() => {
    if (zoomedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [zoomedImage]);

  return (
    <section className="py-20 border-t border-border">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div 
          className="rounded-xl border border-border p-4 bg-secondary/10 shadow-lg cursor-pointer transition-colors duration-300 hover:border-primary/40 relative z-10"
          onClick={() => setZoomedImage(true)}
        >
          <motion.img 
            layoutId="pro-payments"
            src="/images/66806fd5058fac246c9b2ef6_pro-fnl-5.webp" 
            alt="Scaling Payments" 
            className={cn("w-full h-auto rounded-lg origin-center", zoomedImage ? "opacity-0" : "opacity-100")}
            whileHover={{ scale: zoomedImage ? 1 : 1.02 }}
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Scaling Payments</h2>
          <p className="text-muted-foreground text-lg">
            As part of achieving our goals we needed to offer additional payments options. Scaling payment options will increase conversion rates, offer a faster process and provide even less friction for our users at this stage. We defined a success metric of having 10% of new subscribers complete a purchase using PayPal or ApplePay.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 cursor-pointer" onClick={() => setZoomedImage(false)}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.img 
              layoutId="pro-payments"
              src="/images/66806fd5058fac246c9b2ef6_pro-fnl-5.webp" 
              alt="Scaling Payments Zoomed" 
              className="w-full max-w-5xl h-auto rounded-xl shadow-2xl relative z-10"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Outcomes = () => (
  <section className="py-24 border-t border-border">
    <div className="mb-16">
      <h2 className="text-4xl font-bold">Making it count: Part 5</h2>
      <p className="text-muted-foreground mt-4 max-w-3xl text-lg">
        To quantify the value of the subscription redesign and objectively evaluate the project's success, we will track key metrics. Our next steps include monitoring the performance of the new and improved subscription flow, specifically focusing on churn rates, conversion rates, and the use of additional payment options. By refining our Subscriptions and Sign Up/Sign In flows, we can concentrate on enhancing our PRO product offerings.
      </p>
    </div>

    <div className="space-y-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Q1 '21 Analytics</h3>
          <p className="text-muted-foreground">
            As of now, it's still early in the quarter, but the data looks very promising. Demo analytics indicate a 12% increase in conversions compared to the previous month. Additionally, PayPal users account for approximately 23% of daily subscription payments.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-border p-4 bg-secondary/20">
          <img src="/images/6680b99e228e1819803e0ad8_pro-funnel.webp" alt="DOMO Funnel Report" className="w-full h-auto rounded-lg" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden border border-border p-4 bg-secondary/20">
          <img src="/images/6680b33f9ca956d2d9f8e62d_pro-gain.webp" alt="PRO Engagement Increase" className="w-full h-auto rounded-lg" />
        </div>
        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Q3 Update</h3>
          <p className="text-muted-foreground">
            The performance of the CNBC PRO subscription model has improved greatly within the past year of 2021 with new and active subscribers. More users are successfully entering the subscribe flow and making their purchase to the PRO product. That critical second conversion step is retaining new subscribers.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Reflection = () => (
  <section className="py-20 border-t border-border">
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <LockKeyhole className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
      <h2 className="text-3xl font-bold">Reflection</h2>
      <div className="text-lg leading-relaxed text-muted-foreground text-left space-y-4">
        <p>Work on PRO has transitioned to new product initiatives aimed at enhancing the overall value proposition for its subscribers.</p>
        <p>During my tenure, I monitored the funnel of the new subscription flow and identified areas for further improvement. I believe there remains potential for optimizing the account creation process and implementing billing enhancements to streamline the user experience.</p>
      </div>
    </div>
  </section>
);


// --- MAIN APP ---

const sections = [
  { id: 'hero', component: Hero },
  { id: 'context', component: ContextSection },
  { id: 'challenge', component: ChallengeCards },
  { id: 'profiles', component: UserProfiles },
  { id: 'signinflows', component: SigninFlows },
  { id: 'exploration', component: PrototypeComparison },
  { id: 'testing', component: TestingResults },
  { id: 'solution', component: FinalSolution },
  { id: 'brand', component: BrandSystem },
  { id: 'payments', component: PaymentScaling },
  { id: 'outcomes', component: Outcomes },
  { id: 'reflection', component: Reflection },
];

function App() {
  return (
    <div className="min-h-screen transition-all duration-500">
      
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
        <a href="https://mattshade.com" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-primary">
            <path fill="currentColor" d="M 12 1 L 20 14 L 23 21 L 16 16 L 12 23 L 8 16 L 1 21 L 4 14 Z" />
            <circle cx="12" cy="10.5" r="3.2" fill="#ffffff" />
            <circle cx="12" cy="10.5" r="1.3" fill="#0a0a0b" />
          </svg>
          <span className="font-bold text-sm tracking-wide text-foreground">Matt Shade</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="pt-16 max-w-6xl mx-auto px-6">
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <section.component />
            </div>
          ))}
        </div>
      </main>

      {/* Standard Footer */}
      <footer className="border-t border-border py-12 mt-20 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Matt Shade</p>
      </footer>
    </div>
  );
}

export default App;

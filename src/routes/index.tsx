import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu as MenuIcon,
  X,
  Flame,
  Sparkles,
  Timer,
  Award,
  Truck,
  ChefHat,
  MapPin,
  Clock,
  Phone,
  Star,
  Quote,
  Send,
  ArrowRight,
} from "lucide-react";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import logo from "@/assets/Logo.png";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import about1 from "@/assets/about-1.jpg";
import menuBucket from "@/assets/menu-bucket.jpg";
import menuCombo from "@/assets/menu-combo.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuWrap from "@/assets/menu-wrap.jpg";
import menuWings from "@/assets/menu-wings.jpg";
import menuMeal from "@/assets/menu-meal.jpg";
import gal1 from "@/assets/entrance.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import gal4 from "@/assets/gallery-4.jpg";
import gal5 from "@/assets/gallery-5.jpg";
import gal6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        // Open Graph Image
        // This image is shown when someone shares your website link.
        property: "og:image",

        // URL of the preview image
        content: hero1,
      },
    ],

    // Tell search engines which URL is the original page
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Habibi Fried Chicken",
          servesCuisine: ["Fried Chicken", "Burgers", "Wraps"],
          priceRange: "$$",
          image: hero1,
          description: "Cinematic hand crafted fried chicken. Every bite worth craving.",
        }),
      },
    ],
  }),
  component: LandingPage,
});

const SWIGGY_URL =
  "https://www.swiggy.com/city/bangalore/habibi-fried-chicken-koramangala-rest1283797";
const ZOMATO_URL = "https://link.zomato.com/xqzv/rshare?id=12877203430563735";

/* -------------------------------------------------------------------------- */
/*  Reusable pieces                                                            */
/* -------------------------------------------------------------------------- */

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`inline-flex items-center gap-3 leading-none ${className}`}
      aria-label="Habibi Fried Chicken — Home"
    >
      {/* Round Logo */}
      <img
        src={logo}
        alt="Habibi Fried Chicken Logo"
        className="h-24 w-24 rounded-full object-contain"
      />

      {/* Brand Name */}
      <div className="flex items-center gap-2">
        <span className="text-display text-gradient-gold text-2xl md:text-[1.7rem] tracking-tight"></span>

        <span className="text-[0.72rem] md:text-[0.75rem] uppercase tracking-[0.32em] text-ivory/70 font-semibold whitespace-nowrap"></span>
      </div>
    </a>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.4em] text-gold/80">
      <span className="h-px w-8 bg-gold/50" />
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#locations", label: "Locations" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <Wordmark />
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-ivory/85 hover:text-ivory transition-colors"
                >
                  {link.label}
                  <span
                    className={`pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gradient-to-r from-gold to-ember transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#order"
              className="hidden md:inline-flex items-center gap-2 rounded-full btn-gold px-5 py-2.5 text-sm font-semibold"
            >
              Order Now
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-ivory"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-charcoal/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-80 max-w-full glass-panel border-l border-gold/20 p-8"
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="text-display text-3xl text-ivory/90 hover:text-gradient-gold transition"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#order"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full btn-gold px-5 py-3 text-sm font-semibold"
                >
                  Order Now <ArrowRight className="h-4 w-4" />
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — cinematic ken-burns image sequence (video-swappable)                */
/* -------------------------------------------------------------------------- */

const HERO_FRAMES = [
  { src: hero2, kb: "ken-burns-b" },
  { src: hero1, kb: "ken-burns-b" },
  { src: hero3, kb: "ken-burns-c" },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % HERO_FRAMES.length), 5500);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      {/* Cinematic image sequence */}
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0">
        <AnimatePresence>
          {HERO_FRAMES.map((f, idx) =>
            idx === i ? (
              <motion.div
                key={f.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={f.src}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-contain ${f.kb}`}
                />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </motion.div>

      {/* Luxury gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0.35),rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.92))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal"
      />

      {/* Floating ambient particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, k) => (
          <span
            key={k}
            className="absolute h-1 w-1 rounded-full bg-gold/50 blur-[1px] float-slow"
            style={{
              left: `${(k * 71) % 100}%`,
              top: `${(k * 43) % 100}%`,
              animationDelay: `${k * 0.6}s`,
              animationDuration: `${6 + (k % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-32 md:px-10 md:pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl"
        >
          <SectionEyebrow>Since 2026 </SectionEyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-display mt-6 text-[clamp(2rem,6vw,5rem)] text-ivory"
        >
          <br />
          <span className="text-gradient-gold italic"></span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.9 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg"
        >
          <span className="text-display text-gradient-gold text-[1.3em] font-medium">
            Habibi Fried Chicken
          </span>{" "}
          is India's answer to the global fried chicken giants, built around the tastes of the
          Indian consumer. Pioneering the country's first Indian Fried Chicken, Habibi combines
          world-class quality and crunch with bold Indian flavours and spices. By blending global
          QSR standards with local taste preferences, Habibi is redefining the fried chicken
          category and building India's next iconic homegrown fried chicken brand.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 1.55 },
            },
          }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {[
            { label: "Order on Swiggy", href: SWIGGY_URL, primary: true },
            { label: "Order on Zomato", href: ZOMATO_URL, primary: false },
          ].map((cta) => (
            <motion.a
              key={cta.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wider ${
                cta.primary ? "btn-gold" : "btn-ghost-gold"
              }`}
            >
              {cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.4em] text-ivory/60"
      >
        <span className="mr-3">Scroll</span>
        <span className="inline-block h-8 w-px align-middle bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                    */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const items = [
    "Golden Crispy Finish",
    "Crispy Every Bite",
    "Premium Fresh Chicken",
    "Always Served Hot",
    "Cooked to Order",
    "Pure Chicken. Pure Flavor",
  ];
  const line = [...items, ...items];
  return (
    <div className="relative border-y border-gold/15 bg-charcoal py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_38s_linear_infinite]">
        {line.map((t, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 text-display text-xl md:text-2xl text-ivory/85"
          >
            {t}
            <Sparkles className="h-4 w-4 text-gold shrink-0" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

function About() {
  const pillars = [
    {
      t: "Our Story",
      d: "Born from a family recipe passed down three generations, refined in a modern kitchen.",
    },
    {
      t: "Quality Ingredients",
      d: "Free-range chicken, small-batch spices, cold-pressed oils. Nothing else.",
    },
    {
      t: "Freshly Prepared",
      d: "Every piece hand-breaded to order. No shortcuts. No compromises.",
    },
    {
      t: "Signature Taste",
      d: "A 27-spice blend, brined 24 hours, pressure-cooked to golden perfection.",
    },
  ];
  return (
    <section id="about" className="relative py-28 md:py-40 ambient-radial">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-20 lg:items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-ember/20 via-gold/10 to-transparent blur-2xl" />
            <img
              src={about1}
              alt="Chef holding golden crispy fried chicken"
              width={1280}
              height={1600}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
            />
            {/* <div className="absolute -bottom-6 -right-6 hidden md:block glass-panel rounded-2xl px-6 py-5">
              <div className="text-display text-4xl text-gradient-gold">27</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ivory/70">
                Secret Spices
              </div>
            </div> */}
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionEyebrow>Our Craft</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display mt-5 text-[clamp(2.2rem,5vw,4rem)] text-ivory">
              Fried chicken, elevated to an <span className="text-gradient-gold ">art form.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-ivory/70 leading-relaxed">
              At Habibi, we treat fried chicken like fine dining. Slow-brined, hand-breaded, and
              cooked in small batches — the way it should be.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={0.1 + i * 0.08}>
                <div className="group glass-panel rounded-2xl p-6 h-full transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
                  <h3 className="text-display text-xl text-ivory">{p.t}</h3>
                  <p className="mt-2 text-sm text-ivory/65 leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Menu                                                                       */
/* -------------------------------------------------------------------------- */

const MENU_ITEMS = [
  {
    img: menuBucket,
    name: "Fried Chicken 2 PC",
    desc: "Two pieces of crispy perfection",
    price: "₹ 190",
  },
  {
    img: menuBurger,
    name: "OG Crunch Combo",
    desc: "Signature crunch , unforgettable taste.",
    price: "₹ 250",
  },
  {
    img: menuWings,
    name: "Garlic crispy chicken wrap",
    desc: "Crispy chicken, creamy garlic, fresh wrap",
    price: "₹ 250",
  },
  {
    img: menuWrap,
    name: "Chicken popcorn loaded fries",
    desc: "A loaded feast of fries and chicken popcorn.",
    price: "₹ 260",
  },
  {
    img: menuMeal,
    name: "Churros",
    desc: "Warm, crunchy, and perfectly sweet.",
    price: "₹ 120",
  },
  {
    img: menuCombo,
    name: "Chicken fillet burger combo",
    desc: "The perfect cmbo for your cravings.",
    price: "₹ 345",
  },
];

function Menu() {
  return (
    <section id="menu" className="relative py-28 md:py-40 bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <SectionEyebrow>Signature Menu</SectionEyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-display mt-4 text-[clamp(2.2rem,5.5vw,4.5rem)] text-ivory">
                Crafted <span className="text-gradient-gold">to crave.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-ivory/65">
              A curated selection of our house favorites. Each item made-to-order, in small batches,
              the way real food is meant to be.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU_ITEMS.map((item, i) => (
            <Reveal key={item.name + i} delay={(i % 3) * 0.08}>
              <article className="group relative overflow-hidden rounded-2xl bg-card border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-glow-gold">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                  <div className="absolute top-4 right-4 rounded-full glass-panel px-3 py-1 text-xs font-semibold text-gold">
                    {item.price}
                  </div>
                </div>
                <div className="relative p-6">
                  <h3 className="text-display text-2xl text-ivory">{item.name}</h3>
                  <p className="mt-2 text-sm text-ivory/65 leading-relaxed">{item.desc}</p>
                  <div className="mt-5 flex gap-2">
                    <a
                      href={SWIGGY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full btn-gold py-2.5 text-center text-xs font-semibold uppercase tracking-wider"
                    >
                      Swiggy
                    </a>
                    <a
                      href={ZOMATO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full btn-ghost-gold py-2.5 text-center text-xs font-semibold uppercase tracking-wider"
                    >
                      Zomato
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why Choose Us                                                              */
/* -------------------------------------------------------------------------- */

const WHY = [
  {
    Icon: ChefHat,
    t: "Freshly Prepared",
    d: "Made-to-order, never pre-cooked.",
  },
  {
    Icon: Award,
    t: "Premium Quality",
    d: "Free-range, ethically sourced chicken.",
  },
  { Icon: Flame, t: "Crispy Every Time", d: "The perfect crunch, guaranteed." },
  {
    Icon: Truck,
    t: "Fast Delivery",
    d: "Hot at your door via Swiggy & Zomato.",
  },
  {
    Icon: Sparkles,
    t: "Signature Recipes",
    d: "27-spice blend, brined 24 hours.",
  },
  {
    Icon: Timer,
    t: "Consistently Perfect",
    d: "Same craft, every single time.",
  },
];

function WhyUs() {
  return (
    <section className="relative py-28 md:py-36 ambient-radial">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <SectionEyebrow>Why Habibi</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-ivory">
              Details you can <span className="text-gradient-gold ">taste.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={(i % 3) * 0.08}>
              <div className="group glass-panel rounded-2xl p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-ember/25 border border-gold/30">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                </div>
                <h3 className="text-display mt-5 text-2xl text-ivory">{t}</h3>
                <p className="mt-2 text-sm text-ivory/65 leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                    */
/* -------------------------------------------------------------------------- */

const GALLERY = [
  { src: gal2, span: "row-span-2" },
  { src: gal1, span: "" },
  { src: gal3, span: "" },
  { src: gal5, span: "" },
  { src: gal6, span: "row-span-2" },
  { src: gal4, span: "" },
];

function Gallery() {
  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <SectionEyebrow>Visual Journal</SectionEyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-display mt-4 text-[clamp(2.2rem,5.5vw,4.5rem)] text-ivory">
                Inside the <span className="text-gradient-gold">Habibi</span>
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[240px] gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.08} className={g.span}>
              <div className="group relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={g.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110 group-hover:blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 glass-panel rounded-2xl flex items-end p-6">
                  <span className="text-xs uppercase tracking-[0.35em] text-gold">
                    Habibi · No. 0{i + 1}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Locations                                                                  */
/* -------------------------------------------------------------------------- */

const LOCATIONS = [
  {
    name: "Koramangala · Bengaluru",
    address:
      "No 28,Ground Floor, Koramangala Industrial Layout, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    hours: "11:00 AM — 11:00 PM",
    maps: "https://maps.app.goo.gl/rjhK3v1gkZAVYuKSA",
  },
  {
    name: "HRBR Layout · Bengaluru",
    address:
      "CLUB HOUSE, 418, 5th Main Rd, HRBR Layout 2nd Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560043",
    hours: "11:00 AM — 11:00 PM",
    maps: "https://maps.app.goo.gl/47VGZEBcyz6dgrto9",
  },
  {
    name: "Indranagar · (cloud Kitchen) Bengaluru",
    address: "Indiranagar, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
    hours: "11:00 AM — 11:00 PM",
    maps: "",
  },
  {
    name: "Sarjapura· (cloud Kitchen) Bengaluru",
    address:
      "1ST FLOOR, shree complex, 65/1a, Sarjapur Main Rd, Kaikondrahalli, Bengaluru, Karnataka 560035	",
    hours: "11:00 AM — 11:00 PM",
    maps: "https://share.google/zYY7Az0H11NgJzt9M",
  },
];

function Locations() {
  return (
    <section id="locations" className="relative py-28 md:py-36 ambient-radial">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-14">
          <Reveal>
            <SectionEyebrow>Find Us</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-ivory">
              <span className="text-gradient-gold italic"></span>
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {LOCATIONS.map((loc, i) => (
            <Reveal key={loc.name} delay={i * 0.1}>
              <div className="group glass-panel rounded-2xl p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400)]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300/90">
                    Delivery Available
                  </span>
                </div>
                <h3 className="text-display mt-4 text-2xl text-ivory">{loc.name}</h3>
                <p className="mt-3 flex items-start gap-2 text-sm text-ivory/70">
                  <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                  {loc.address}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-ivory/70">
                  <Clock className="h-4 w-4 text-gold" />
                  {loc.hours}
                </p>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all"
                >
                  Open in Maps <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Order (Swiggy / Zomato)                                                    */
/* -------------------------------------------------------------------------- */

function Order() {
  const cards = [
    {
      name: "Swiggy",
      tag: "Priority Partner",
      color: "from-[#FC8019] to-[#FFB347]",
      href: SWIGGY_URL,
      desc: "Live tracking, priority prep, and lightning-fast delivery from our kitchen to your door.",
    },
    {
      name: "Zomato",
      tag: "Featured Restaurant",
      color: "from-[#E23744] to-[#FF6B6B]",
      href: ZOMATO_URL,
      desc: "Explore our full menu with reviews from thousands of Habibi regulars.",
    },
  ];
  return (
    <section id="order" className="relative py-28 md:py-36 bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Reveal>
            <SectionEyebrow>Order Online</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-ivory">
              Delivered <span className="text-gradient-gold">hot.</span> Everywhere.
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-3xl glass-panel p-10 md:p-12 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40"
              >
                <div
                  className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
                />
                <div className="relative">
                  <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                    {c.tag}
                  </span>
                  <h3
                    className={`text-display mt-4 text-5xl md:text-6xl bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-4 max-w-md text-ivory/70 leading-relaxed">{c.desc}</p>
                  <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-ivory">
                    Order Now
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold text-charcoal transition-transform group-hover:translate-x-2">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* -------------------------------------------------------------------------- */

const REVIEWS = [
  {
    name: "Lakshman S",
    role: "Food Blogger, Banglore",
    q: "The Burgers here are just outstanding!! French Fries quantity and quality are too good!! It's soo addictive.. Price is also reasonable!!",
  },
  {
    name: "Rohan M.",
    role: "Regular since 2026",
    q: "You can taste the care in every single piece. Habibi is on another level.",
  },
  {
    name: "Priya S.",
    role: "Bengaluru",
    q: "That first bite — impossibly crunchy, then juicy. Cinematic.",
  },
  {
    name: "Kabir A.",
    role: "Bengaluru",
    q: "Fried chicken has a new benchmark, and it's called Habibi.",
  },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <section className="relative py-28 md:py-36 ambient-radial">
      <div className="mx-auto max-w-4xl px-5 md:px-10 text-center">
        <Reveal>
          <SectionEyebrow>What They're Saying</SectionEyebrow>
        </Reveal>
        <div className="relative mt-10 h-[280px] md:h-[240px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 glass-panel rounded-3xl p-8 md:p-12 flex flex-col justify-center"
            >
              <Quote className="mx-auto h-8 w-8 text-gold/70" />
              <blockquote className="text-display mt-6 text-2xl md:text-3xl text-ivory italic leading-snug">
                “{REVIEWS[idx].q}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-ivory/70">
                <span className="text-gold font-semibold">{REVIEWS[idx].name}</span>
                <span className="mx-2 text-ivory/40">·</span>
                {REVIEWS[idx].role}
              </figcaption>
              <div className="mt-4 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === idx ? "w-8 bg-gold" : "w-4 bg-ivory/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvgvrjk";

type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<ContactSubmitStatus>("idle");

  const [submitMessage, setSubmitMessage] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedForm = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (!trimmedForm.name || !trimmedForm.phone || !trimmedForm.email || !trimmedForm.message) {
      setSubmitStatus("error");
      setSubmitMessage("Please complete all required fields.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const submittedAtIndia = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "long",
        timeStyle: "medium",
      }).format(new Date());

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedForm.name,
          phone: trimmedForm.phone,
          email: trimmedForm.email,
          message: trimmedForm.message,
          submittedAtIndia,
          source: "Habibi Fried Chicken Website",
          _subject: "New Habibi Fried Chicken Website Inquiry",
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        const formspreeError =
          result?.errors?.map((error: { message: string }) => error.message).join(", ") ||
          "Unable to send your message. Please try again.";

        throw new Error(formspreeError);
      }

      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you. Your inquiry has been sent successfully. Our team will contact you shortly.",
      );
    } catch (error) {
      console.error("Habibi inquiry submission failed:", error);

      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="relative bg-charcoal py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionEyebrow>Get in Touch</SectionEyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-ivory">
                We'd love to <span className="text-gradient-gold">hear from you.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-ivory/65">
                Feedback, complaints, catering inquiries, or just a warm hello — send us a message
                and our team will get back to you shortly.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              {[
                {
                  Icon: MapPin,
                  label: "No. 28, Ground Floor, Koramangala Industrial Layout, Bengaluru",
                },
                {
                  Icon: Phone,
                  label: "+91 70907 99989",
                },
                {
                  Icon: Clock,
                  label: "Open Daily · 10:00 AM – 09:00 PM",
                },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-start gap-4 text-ivory/80">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                    <Icon className="h-4 w-4 text-gold" />
                  </span>

                  <span className="pt-2 text-sm leading-relaxed">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((SocialIcon, index) => (
                <a
                  key={index}
                  href="https://www.instagram.com/habibifriedchicken?igsh=MWlxd2Rld3M3YTVoeQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Habibi Fried Chicken social media"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="grid gap-5">
                {[
                  {
                    key: "name",
                    label: "Name",
                    type: "text",
                    autoComplete: "name",
                    placeholder: "Ex: Batman",
                  },
                  {
                    key: "phone",
                    label: "Phone",
                    type: "tel",
                    autoComplete: "tel",
                    placeholder: "+91 98765 43210",
                  },
                  {
                    key: "email",
                    label: "Email",
                    type: "email",
                    autoComplete: "email",
                    placeholder: "you@example.com",
                  },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-xs uppercase tracking-[0.3em] text-ivory/60">
                      {field.label}
                    </span>

                    <input
                      required
                      name={field.key}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [field.key]: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-ivory placeholder:text-ivory/30 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.3em] text-ivory/60">Message</span>

                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-ivory placeholder:text-ivory/30 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </label>

                {submitMessage && (
                  <div
                    role={submitStatus === "error" ? "alert" : "status"}
                    className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                      submitStatus === "success"
                        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                        : "border-red-400/25 bg-red-400/10 text-red-300"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="btn-gold mt-2 inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitStatus === "submitting" ? "Sending..." : "Send Message"}

                  {submitStatus === "submitting" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/60 border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>

                <p className="text-center text-[10px] leading-relaxed text-ivory/40">
                  By submitting this form, you agree to be contacted regarding your inquiry.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-gradient-to-b from-charcoal to-[#0a0a0a] pt-20 pb-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px hairline"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Wordmark />
            <p className="mt-5 max-w-sm text-sm text-ivory/60 leading-relaxed">
              Hand crafted fried chicken, made the way it should be. Since 2026.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory/60 hover:text-gold hover:border-gold transition"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-gold transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold">Hours</h4>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              <li>ALL DAYS · 10 AM – 11 PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/45">
          <span>© {new Date().getFullYear()} Habibi Fried Chicken. All rights reserved.</span>
          <span>Crafted with care. Served with soul.</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

function LandingPage() {
  return (
    <main className="relative min-h-screen bg-charcoal text-ivory">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Menu />
      <WhyUs />
      <Gallery />
      <Locations />
      <Order />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

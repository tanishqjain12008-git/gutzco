import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Pause, Play, Sparkles, Heart, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo, Footer, GutMascot } from "@/components/brand";
import hero from "@/assets/hero.mp4.asset.json";
import compatibleHero from "@/assets/hero.webm.asset.json";
import poster from "@/assets/poster.jpg.asset.json";
import product from "@/assets/product.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Gutz Co. — Good gut. Great vibes." },
    { name: "description", content: "A little can with a big gut feeling. Discover Gutz prebiotic and probiotic elixir, ₹100 for 100 ml with free Delhi delivery." },
    { property: "og:title", content: "Gutz Co. — Good gut. Great vibes." },
    { property: "og:description", content: "Meet your new gut ritual. Explore our story and our colourful 100 ml elixir." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});

function Index() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { video.current?.pause(); setPlaying(false); }
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  function toggleVideo() { const el = video.current; if (!el) return; if (el.paused) { void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); } else { el.pause(); setPlaying(false); } }
  return <main>
    <section className="hero-section">
      <video ref={video} className="hero-video" poster={poster.url} autoPlay muted loop playsInline preload="auto" aria-label="Gutz elixir product film" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src={compatibleHero.url} type="video/webm" /><source src={hero.url} type="video/mp4" /></video>
      <div className="hero-wash" />
      <nav className="hero-nav" aria-label="Main navigation"><a href="#our-story">Our story <span>↗</span></a><Link to="/" aria-label="Gutz home"><BrandLogo /></Link><a href="#product">The good stuff <span>↗</span></a></nav>
      <div className="hero-copy"><div className="eyebrow"><span className="tiny-star">✦</span> YOUR GUT’S NEW PLUS ONE</div><h1>GUTZ<span className="heading-dot">.</span></h1><h2>Good gut.<br />Great vibes.</h2><p>A little can with a big gut feeling.<br />Meet your new feel-good ritual.</p><Button asChild variant="brand" size="lg"><Link to="/checkout">Get your Gutz <ArrowUpRight /></Link></Button><div className="hero-small">100 ml of good energy. Zero boring.</div></div>
      <div className="hero-seal"><Sparkles /><span>GO WITH<br />YOUR GUT</span><span className="seal-small">TASTES GOOD, TOO.</span></div>
      <div className="hero-bottom"><a href="#our-story"><ArrowDown size={17} /> A good story starts in the gut</a><Button variant="quiet" size="icon" onClick={toggleVideo} aria-label={playing ? "Pause video" : "Play video"}>{playing ? <Pause /> : <Play />}</Button></div>
    </section>
    <div className="marquee" aria-label="Good gut. Great vibes. Solves gut. Tastes good."><div className="marquee-track">{Array.from({length: 4}, (_, i) => <span key={i}>GOOD GUT <span>✦</span> GREAT VIBES <span>✦</span> SOLVES GUT <span>✦</span> TASTES GOOD <span>✦</span></span>)}</div></div>
    <section className="story-section" id="our-story">
      <div className="section-label"><span>01 / OUR STORY</span><span>A LITTLE PERSONAL. A LOT OF PURPOSE.</span></div>
      <div className="story-intro reveal"><div><h2>We had a<br /><span>gut feeling.</span><Sparkles className="story-spark" /></h2></div><div className="story-intro-copy"><p>Life’s too good to let your gut<br className="desktop-break" /> kill the vibe.</p><p>Our founder saw how everyday gut struggles could get in the way of, well… everything. And thought: what if looking after your gut felt less like a chore and more like a treat?</p><span className="hand-note">And just like that, Gutz happened. ↙</span></div></div>
      <div className="story-journey reveal"><article><div className="journey-art problem-art"><GutMascot happy={false} /><span className="doodle-word">not the vibe.</span></div><span className="step-number">01 — THE REALISATION</span><h3>Gut drama is real.</h3><p>The discomfort. The off days. The plans you’d rather skip. We knew your gut deserved better.</p></article><MoveRight className="journey-arrow" /><article><div className="journey-art idea-art"><Heart /><span className="doodle-word">a little more love.</span><Sparkles className="idea-spark" /></div><span className="step-number">02 — THE BIG IDEA</span><h3>Care, in a can.</h3><p>Bring prebiotics and probiotics together in a drink you’ll actually look forward to sipping.</p></article><MoveRight className="journey-arrow" /><article><div className="journey-art happy-art"><GutMascot /><span className="doodle-word">hello, Gutz!</span></div><span className="step-number">03 — THE GOOD STUFF</span><h3>A new daily ritual.</h3><p>Something small. Something delicious. A little everyday love for the gut that goes everywhere with you.</p></article></div>
      <div className="story-end"><span>Not another wellness lecture.</span><strong>Just a really good gut feeling. <span>☺</span></strong></div>
    </section>
    <section className="product-section" id="product">
      <div className="section-label"><span>02 / MEET YOUR NEW RITUAL</span><span>SMALL CAN. BIG MAIN-CHARACTER ENERGY.</span></div>
      <div className="product-grid reveal"><div className="product-visual"><div className="product-image-wrap"><img src={product.url} alt="100 ml Gutz prebiotic and probiotic elixir can with ginger and berries" loading="lazy" /></div><div className="product-sticker">YOUR GUT<br />CALLED.<br /><span>IT WANTS THIS.</span></div><span className="product-note">a sip in the right direction ↗</span></div><div className="product-copy"><div className="eyebrow"><Sparkles size={16} /> PREBIOTIC + PROBIOTIC ELIXIR</div><h2>Small can.<br /><span>Big Gutz.</span></h2><p className="product-lead">Your gut’s new favourite person.<br />Except it’s a drink.</p><p>A feel-good elixir with prebiotics and probiotics, made for your daily reset. All the good intentions. None of the boring.</p><div className="product-features"><span><Check /> Prebiotics + probiotics</span><span><Check /> 100 ml, ready to sip</span><span><Check /> Best served chilled</span></div><div className="product-buy"><div><strong>₹100</strong><span>/ 100 ml can</span></div><Button asChild variant="brand" size="lg"><Link to="/checkout">Buy Now <ArrowUpRight /></Link></Button></div><div className="delivery-note">A little love, delivered. Free shipping across Delhi.</div><p className="product-disclaimer">A daily wellness ritual, not a medicine. Not intended to diagnose, treat, cure or prevent any disease.</p></div></div>
    </section>
    <div className="closing-band"><span>GOOD TASTE.</span><GutMascot /><span>GUT INSTINCT.</span></div>
    <Footer />
  </main>;
}

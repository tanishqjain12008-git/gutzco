import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, Sparkles } from "lucide-react";
import { media } from "@/lib/media";

export function BrandLogo({ className = "" }: { className?: string }) {
  return <img className={`brand-logo ${className}`} src={media.logo} alt="Gutz — solves gut, tastes good" />;
}
export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><Link to="/" aria-label="Gutz home"><BrandLogo /></Link><p>Trust your gut.<br /><span>We do.</span> <Sparkles aria-hidden="true" /></p><div className="footer-contact"><a href="mailto:gutzco@gmail.com"><Mail size={16} />gutzco@gmail.com<ArrowUpRight size={16} /></a><a href="tel:1234567890"><Phone size={16} />1234567890<ArrowUpRight size={16} /></a></div></div>
    <div className="footer-bottom"><span>© 2026 Gutz Co.</span><span>Made with a gut feeling.</span><span>Delhi, India ↗</span></div>
  </footer>;
}
export function GutMascot({ happy = true }: { happy?: boolean }) {
  return <svg viewBox="0 0 180 180" fill="none" aria-hidden="true" className="gut-mascot"><path d="M78 17c-12 34 9 42 19 39 25-8 47 8 47 39 0 37-31 58-60 45-21-10-30-39-44-23-8 9-2 25-13 27-19 2-20-36-7-51 17-20 36-16 48-5 21 20 37 7 30-12C88 51 58 52 61 17" className="mascot-body" /><path d="M94 91c2-8 12-9 15-1m15 4c2-7 11-7 13 0" className="mascot-face" />{happy ? <path d="M96 108c7 15 25 18 37 3" className="mascot-face" /> : <path d="M105 122c5-9 13-9 18-4" className="mascot-face" />}<path d="M152 34v25m-12-12h25M34 54v16m-8-8h16" className="mascot-star" /></svg>;
}
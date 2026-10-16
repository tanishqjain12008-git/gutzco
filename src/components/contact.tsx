import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_ENDPOINT, contactSchema } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details"); return; }
    setError(""); setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...parsed.data, _subject: `New Gutz message from ${parsed.data.name}`, _template: "table", _captcha: "false" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error();
      form.reset(); setStatus("sent");
    } catch { setStatus("error"); setError("Couldn’t send right now. Please try again or email us directly."); }
  }

  return <section className="contact-section" id="contact">
    <div className="section-label"><span>03 / SAY HI</span><span>SLIDE INTO OUR INBOX.</span></div>
    <div className="contact-grid reveal">
      <div className="contact-copy">
        <div className="eyebrow"><Sparkles size={16} /> GOT A GUT FEELING?</div>
        <h2>Let’s talk<br /><span>gut stuff.</span></h2>
        <p>Questions, bulk orders, collabs or just good vibes — drop us a note and we’ll get back to you soon.</p>
      </div>
      {status === "sent" ? <div className="contact-done" role="status"><CheckCircle2 /><h3>Message sent!</h3><p>Thanks for reaching out. We’ll reply to your email soon.</p><Button variant="brand" onClick={() => setStatus("idle")}>Send another</Button></div> :
      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="field-grid">
          <label className="field">Your name<input name="name" autoComplete="name" required maxLength={80} /></label>
          <label className="field">Email<input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
          <label className="field field-wide">Phone (optional)<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} /></label>
          <label className="field field-wide">Message<textarea name="message" rows={5} required maxLength={1500} /></label>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button type="submit" variant="brand" size="lg" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Send message <ArrowUpRight /></>}</Button>
      </form>}
    </div>
  </section>;
}

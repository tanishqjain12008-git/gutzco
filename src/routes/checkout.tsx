import { media } from "@/lib/media";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CreditCard, LockKeyhole, Minus, Plus, Smartphone, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo, Footer } from "@/components/brand";
import { deliverySchema, getBill, PRODUCT, rupees } from "@/lib/shop";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout — Gutz Co." },
    { name: "description", content: "Your Gutz ritual starts here. ₹100 per 100 ml can with free delivery in Delhi. Demo checkout." },
    { property: "og:title", content: "Checkout — Gutz Co." },
    { property: "og:description", content: "A little love, delivered. Complete your Gutz demo checkout." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Checkout,
});

function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<"delivery" | "payment" | "complete">("delivery");
  const [details, setDetails] = useState({ name: "", email: "", phone: "", address: "", city: "Delhi", pin: "" });
  const [error, setError] = useState("");
  const [payment, setPayment] = useState("upi");
  const [reference, setReference] = useState("");
  const bill = getBill(quantity);
  const fields = [
    { key: "name", label: "Full name", placeholder: "Your name", auto: "name", wide: true },
    { key: "email", label: "Email address", placeholder: "you@example.com", auto: "email", type: "email" },
    { key: "phone", label: "Mobile number", placeholder: "10-digit mobile number", auto: "tel", type: "tel" },
    { key: "address", label: "Delivery address", placeholder: "House / flat, street, locality", auto: "street-address", wide: true },
    { key: "city", label: "City", placeholder: "Delhi", auto: "address-level2" },
    { key: "pin", label: "PIN code", placeholder: "110xxx", auto: "postal-code" },
  ] as const;
  function submitDelivery(event: FormEvent) {
    event.preventDefault();
    const result = deliverySchema.safeParse(details);
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Check your delivery details."); return; }
    setDetails(result.data); setError(""); setStep("payment");
  }
  function placeDemoOrder() {
    const result = deliverySchema.safeParse(details);
    if (!result.success) { setError("Check your delivery details."); setStep("delivery"); return; }
    setReference(`GUTZ-DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
    setStep("complete"); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return <div className="checkout-page">
    <header className="checkout-header"><Link to="/"><ArrowLeft size={16} />Back to the good stuff</Link><Link to="/" aria-label="Gutz home"><BrandLogo /></Link><span><LockKeyhole size={14} />DEMO CHECKOUT</span></header>
    {step === "complete" ? <main className="confirmation"><CheckCircle2 /><div className="eyebrow justify-center">GOOD GUT FEELINGS AHEAD</div><h1>You’ve got Gutz!</h1><p>Nice choice, {details.name.split(" ")[0]}. Your demo order is complete.<br />No payment was taken and no products will be shipped.</p><div className="confirmation-details"><p><strong>{reference}</strong></p><p>{quantity} × Gutz Elixir · {PRODUCT.volume}</p><p>Total: <strong>{rupees(bill.total)}</strong> · Free delivery</p><p>Demo payment: {payment === "upi" ? "UPI" : payment === "card" ? "Card" : "Cash on delivery"}</p><p>Delivery to: {details.name}, {details.address}, {details.city} {details.pin}</p><p>Contact: {details.phone}</p></div><Button asChild variant="brand" size="lg"><Link to="/">Back to Gutz <ArrowUpRight /></Link></Button></main> : <main className="checkout-main"><h1>A good choice. <span>Gut-approved.</span></h1><p className="checkout-subtitle">A little can of good energy is calling your name.</p><div className="checkout-layout"><div><div className="checkout-steps"><span className={step === "delivery" ? "current-step" : ""}>01 / DELIVERY</span><span>→</span><span className={step === "payment" ? "current-step" : ""}>02 / PAYMENT</span><span>→</span><span>03 / GOOD VIBES</span></div>{step === "delivery" ? <form className="checkout-form" onSubmit={submitDelivery}><h2>Where’s the good stuff going?</h2><div className="demo-notice">Just a demo. Your details aren’t saved, and you won’t be charged. Free delivery in Delhi only.</div><div className="field-grid">{fields.map((field) => <label key={field.key} className={`field ${"wide" in field && field.wide ? "field-wide" : ""}`}><span>{field.label}</span><input name={field.key} type={"type" in field ? field.type : "text"} autoComplete={field.auto} placeholder={field.placeholder} value={details[field.key]} maxLength={field.key === "address" ? 300 : field.key === "phone" ? 10 : field.key === "pin" ? 6 : 100} inputMode={field.key === "pin" || field.key === "phone" ? "numeric" : undefined} required onChange={(event) => setDetails({ ...details, [field.key]: event.target.value })} /></label>)}</div>{error && <p role="alert" className="form-error">{error}</p>}<Button variant="brand" type="submit" className="checkout-next">Continue to payment <ArrowUpRight /></Button></form> : <section className="checkout-form"><h2>One last little thing.</h2><div className="demo-notice">Demo payment only. No real money, no card details needed, no order will be shipped.</div><div className="address-review"><strong>{details.name}</strong>{details.address}<br />{details.city}, {details.pin}<br />{details.phone}</div><h2>Pick your payment</h2><div className="payment-options">{[{ value: "upi", label: "UPI", icon: Smartphone }, { value: "card", label: "Credit / debit card", icon: CreditCard }, { value: "cod", label: "Cash on delivery", icon: Banknote }].map((option) => <label className="payment-option" key={option.value}><input type="radio" name="payment" value={option.value} checked={payment === option.value} onChange={() => setPayment(option.value)} /><span>{option.label} <small>— demo</small></span><option.icon size={20} /></label>)}</div><Button variant="brand" className="checkout-next" onClick={placeDemoOrder}>Place demo order · {rupees(bill.total)} <ArrowUpRight /></Button><Button variant="link" className="payment-back" onClick={() => setStep("delivery")}><ArrowLeft />Edit delivery details</Button></section>}</div><aside className="order-summary"><h2>Your good stuff</h2><div className="summary-product"><img src={media.product} alt="Gutz elixir can" /><div><h3>{PRODUCT.name}</h3><p>Prebiotic + probiotic elixir<br />{PRODUCT.volume} · {rupees(PRODUCT.price)} per can</p><div className="quantity-picker"><Button variant="quiet" size="icon" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}><Minus /></Button><output aria-label="Quantity">{quantity}</output><Button variant="quiet" size="icon" aria-label="Increase quantity" disabled={quantity === 99} onClick={() => setQuantity(quantity + 1)}><Plus /></Button></div></div></div><div className="bill-row"><span>Subtotal</span><span>{rupees(bill.subtotal)}</span></div><div className="bill-row"><span>Delivery · Delhi</span><span className="free">FREE</span></div><div className="bill-row bill-total"><span>Total</span><span>{rupees(bill.total)}</span></div><p className="summary-note">100 ml of good vibes per can.<br />Best served chilled. Best enjoyed your way.</p></aside></div></main>}
    <Footer />
  </div>;
}
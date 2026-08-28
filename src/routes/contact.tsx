import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FreshCart — We're Here To Help" },
      {
        name: "description",
        content:
          "Questions about an order or a delivery slot? Message the FreshCart team or reach us by phone, email or at our Greenfield depot.",
      },
      { property: "og:title", content: "Contact FreshCart — We're Here To Help" },
      { property: "og:description", content: "Support answers in minutes, 24 hours a day." },
    ],
  }),
  component: ContactPage,
});

const CARDS = [
  {
    icon: MapPin,
    title: "📍 Location",
    lines: ["24 Orchard Lane", "Greenfield, GF3 8QP"],
    tint: "bg-pastel-mint",
  },
  { icon: Phone, title: "📞 Phone", lines: ["+1 (555) 014-2277", "Mon–Sun"], tint: "bg-pastel-sky" },
  {
    icon: Mail,
    title: "✉️ Email",
    lines: ["hello@freshcart.example", "support@freshcart.example"],
    tint: "bg-pastel-butter",
  },
  {
    icon: Clock,
    title: "🕐 Opening Hours",
    lines: ["Deliveries 7am – 10pm", "Support 24/7"],
    tint: "bg-pastel-peach",
  },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const next = { ...e };
      delete next[k];
      return next;
    });
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e["name"] = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e["email"] = "Enter a valid email address.";
    if (form.subject.trim().length < 3) e["subject"] = "Add a short subject.";
    if (form.message.trim().length < 10) e["message"] = "A little more detail helps us help you.";
    setErrors(e);
    if (Object.keys(e).length) {
      toast.error("Please check the highlighted fields.");
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent — we'll reply within a few hours! 🌿");
  };

  const field =
    "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary";
  const labelCls = "text-xs font-bold uppercase tracking-widest text-muted-foreground";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">We'd love to hear from you</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Missing an item, changing a delivery slot, or just want to say hello? Our team is on it.
        </p>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <div key={c.title} className={`fc-lift fc-grain rounded-3xl ${c.tint} p-6 shadow-soft`}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-primary">
              <c.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-sm font-bold">{c.title}</h2>
            {c.lines.map((l) => (
              <p key={l} className="mt-1 text-sm text-muted-foreground">
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-lg font-bold">Send us a message</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelCls}>
                Name
              </label>
              <input
                id="c-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                aria-invalid={!!errors["name"]}
                className={`${field} ${errors["name"] ? "border-destructive" : ""}`}
              />
              {errors["name"] ? (
                <p className="mt-1 text-xs font-semibold text-destructive">{errors["name"]}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="c-email" className={labelCls}>
                Email
              </label>
              <input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!errors["email"]}
                className={`${field} ${errors["email"] ? "border-destructive" : ""}`}
              />
              {errors["email"] ? (
                <p className="mt-1 text-xs font-semibold text-destructive">{errors["email"]}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="c-subject" className={labelCls}>
              Subject
            </label>
            <input
              id="c-subject"
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              placeholder="How can we help?"
              aria-invalid={!!errors["subject"]}
              className={`${field} ${errors["subject"] ? "border-destructive" : ""}`}
            />
            {errors["subject"] ? (
              <p className="mt-1 text-xs font-semibold text-destructive">{errors["subject"]}</p>
            ) : null}
          </div>

          <div className="mt-4">
            <label htmlFor="c-message" className={labelCls}>
              Message
            </label>
            <textarea
              id="c-message"
              rows={5}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Tell us a little more..."
              aria-invalid={!!errors["message"]}
              className={`${field} resize-y ${errors["message"] ? "border-destructive" : ""}`}
            />
            {errors["message"] ? (
              <p className="mt-1 text-xs font-semibold text-destructive">{errors["message"]}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105 active:scale-95 sm:w-auto sm:px-10"
          >
            Send Message
          </button>

          {sent ? (
            <p className="animate-pop mt-5 rounded-2xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary-deep dark:text-primary">
              🌿 Thanks! Your message is with our team — expect a reply within a few hours.
            </p>
          ) : null}
        </form>

        <aside className="rounded-3xl border border-border bg-secondary/50 p-6">
          <h2 className="text-base font-bold">Quick answers</h2>
          <dl className="mt-4 grid gap-4 text-sm">
            {[
              ["When will my order arrive?", "Standard lands next morning; express in 30–60 minutes."],
              ["Something wasn't fresh?", "Reply to your confirmation email and we refund that item."],
              ["Can I change my address?", "Yes — update it at checkout before placing the order."],
            ].map(([q, a]) => (
              <div key={q}>
                <dt className="font-semibold">{q}</dt>
                <dd className="mt-1 text-muted-foreground">{a}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}

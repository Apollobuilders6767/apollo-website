import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import AttributionFields from "@/components/AttributionFields";
import { projectTypes } from "@/lib/data";
import { submitEnquiry } from "@/lib/enquiries";

// Short quote form. Email is not collected; the enquiry API accepts that
// and the notification still goes to info@apollobuilders.com.au.
export default function QuoteForm({ formName, defaultProject = "" }) {
  const navigate = useNavigate();
  const formLoadedAt = useRef(Date.now());
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    suburb: "",
    project_type: defaultProject,
    message: "",
    website: "",
  });

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.suburb || !form.project_type) {
      toast.error("Please add your name, phone, suburb and project type.");
      return;
    }
    setBusy(true);
    try {
      await submitEnquiry({
        name: form.name,
        phone: form.phone,
        address: form.suburb,
        project_type: form.project_type,
        message: form.message.trim() || "Quote request.",
        website: form.website,
        form_name: formName,
        form_loaded_at: formLoadedAt.current,
      });
      toast.success("Quote request sent. We'll be in touch shortly.");
      navigate("/thank-you/");
    } catch (err) {
      toast.error(err.userMessage || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bg-[color:var(--cream)] text-[color:var(--ink)] py-16 md:py-24" data-testid={`quote-form-${formName}`}>
      <div className="mx-auto max-w-[840px] px-6 md:px-10">
        <div className="tracking-eyebrow text-[color:var(--gold-dark)]">Free quote</div>
        <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-[color:var(--ink-black)] mt-4">
          Tell us about your project.
        </h2>
        <form onSubmit={submit} noValidate className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8" data-testid={`quote-form-fields-${formName}`}>
          <AttributionFields />
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
            <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={onChange} />
          </div>
          <label className="block pt-4">
            <span className="tracking-eyebrow text-[color:var(--gold-dark)] block mb-1">Name *</span>
            <input name="name" value={form.name} onChange={onChange} className="field-flush" autoComplete="name" />
          </label>
          <label className="block pt-4">
            <span className="tracking-eyebrow text-[color:var(--gold-dark)] block mb-1">Phone *</span>
            <input name="phone" type="tel" value={form.phone} onChange={onChange} className="field-flush" autoComplete="tel" />
          </label>
          <label className="block pt-4">
            <span className="tracking-eyebrow text-[color:var(--gold-dark)] block mb-1">Suburb *</span>
            <input name="suburb" value={form.suburb} onChange={onChange} className="field-flush" autoComplete="address-level2" />
          </label>
          <label className="block pt-4">
            <span className="tracking-eyebrow text-[color:var(--gold-dark)] block mb-1">Project type *</span>
            <select name="project_type" value={form.project_type} onChange={onChange} className="field-flush appearance-none bg-transparent">
              <option value="">— Select —</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="block pt-4 md:col-span-2">
            <span className="tracking-eyebrow text-[color:var(--gold-dark)] block mb-1">Message</span>
            <textarea name="message" value={form.message} onChange={onChange} className="field-flush min-h-[100px]" />
          </label>
          <div className="md:col-span-2 pt-6">
            <button type="submit" disabled={busy} className="btn-navy disabled:opacity-60">
              {busy ? "Sending…" : "Request a quote"} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Download, LoaderCircle, MessageSquare, Phone } from "lucide-react";
import {
  EMPTY_INQUIRY,
  EVENT_TYPES,
  formatInquiry,
  getNairobiDate,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
} from "@/lib/inquiry";
import SplitText from "./SplitText";
import { amharicServices, phoneNumbers, socialLinks } from "@/lib/site";
import styles from "./Contact.module.css";

const PHONE_URI = "tel:+251941097286";
type TextField = Exclude<InquiryField, "consent">;

function Field({
  id,
  label,
  optional = false,
  error,
  children,
  full = false,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ""}`}>
      <label htmlFor={id}>
        {label}{optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {children}
      {error && <p className={styles.fieldError} id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default function Contact({ deliveryConfigured = false }: { deliveryConfigured?: boolean }) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const pendingRef = useRef(false);
  const [fields, setFields] = useState({ ...EMPTY_INQUIRY });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [mode, setMode] = useState<"form" | "review" | "sent">("form");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [deliveryUnconfirmed, setDeliveryUnconfirmed] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [today, setToday] = useState("");
  // A statically generated page may be visited days after its build. Resolve
  // the date after hydration so the HTML stays consistent and the limit is fresh.
  useEffect(() => { setToday(getNairobiDate()); }, []);

  function updateField<K extends InquiryField>(field: K, value: (typeof EMPTY_INQUIRY)[K]) {
    setFields((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      delete next.form;
      return next;
    });
    setSubmissionError("");
  }

  const inputProps = (field: TextField) => ({
    id: `${id}-${field}`,
    name: field,
    value: fields[field],
    disabled: isSubmitting,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      updateField(field, event.target.value),
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
  });

  function focusError(nextErrors: InquiryErrors) {
    requestAnimationFrame(() => {
      const firstField = Object.keys(nextErrors).find((field) => field !== "form");
      const element = firstField ? formRef.current?.elements.namedItem(firstField) : null;
      if (element instanceof HTMLElement) element.focus();
      else errorRef.current?.focus();
    });
  }

  function focusReview() {
    requestAnimationFrame(() => {
      reviewRef.current?.focus({ preventScroll: true });
      reviewRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  function prepareReview(inquiry: Inquiry) {
    setReviewText(formatInquiry(inquiry));
    setCopyStatus("");
    setMode("review");
    focusReview();
  }

  function prepareManually() {
    const validation = validateInquiry(fields);
    if (!validation.ok) {
      setErrors(validation.errors);
      focusError(validation.errors);
      return;
    }
    prepareReview(validation.data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    const validation = validateInquiry(fields);
    if (!validation.ok) {
      setErrors(validation.errors);
      focusError(validation.errors);
      return;
    }
    setErrors({});
    setSubmissionError("");
    if (!deliveryConfigured) {
      setDeliveryUnconfirmed(false);
      prepareReview(validation.data);
      return;
    }

    pendingRef.current = true;
    setIsSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });
      const result = await response.json() as { ok?: boolean; message?: string; errors?: InquiryErrors };
      if (!response.ok || result.ok !== true) {
        if (result.errors) {
          setErrors(result.errors);
          focusError(result.errors);
        }
        setDeliveryUnconfirmed(response.status >= 500);
        setSubmissionError(result.message || "Delivery could not be confirmed. Please use the manual contact options.");
        return;
      }
      setReviewText(formatInquiry(validation.data));
      setMode("sent");
      setCopyStatus("");
      setDeliveryUnconfirmed(false);
      focusReview();
    } catch {
      setDeliveryUnconfirmed(true);
      setSubmissionError("Delivery could not be confirmed. Your details are still here; please call the studio or prepare a manual inquiry below.");
    } finally {
      clearTimeout(timeout);
      pendingRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function copyInquiry() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(reviewText);
      setCopyStatus("Copied. You can paste your inquiry into a message.");
    } catch {
      textRef.current?.focus();
      textRef.current?.select();
      setCopyStatus("Your inquiry text is selected. Use your device’s Copy command to copy it.");
    }
  }

  function downloadInquiry() {
    const url = URL.createObjectURL(new Blob([reviewText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "timeless-event-inquiry.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function editDetails() {
    setMode("form");
    setSubmissionError("");
    requestAnimationFrame(() => {
      const name = formRef.current?.elements.namedItem("name");
      if (name instanceof HTMLElement) name.focus();
    });
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <motion.div
          className={styles.introduction}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.eyebrow}>Your next chapter</p>
          <SplitText as="h2" id={`${id}-heading`}>Every extraordinary event begins with a <em>conversation.</em></SplitText>
          <p className={styles.introCopy}>A place. A feeling. A first idea. Tell us what you are imagining, and let’s begin there.</p>

          <a className={styles.studioCard} href={PHONE_URI} aria-label="Call Timeless Decor and Event on 0941097286">
            <span className={styles.cardTop}>
              <span className={styles.eyebrow}>Speak to our studio</span>
              <span className={styles.phoneIcon}><Phone size={17} strokeWidth={1.4} aria-hidden="true" /></span>
            </span>
            <span className={styles.phoneNumber}>0941097286</span>
            <span className={styles.cardBottom}>Timeless Décor &amp; Events <ArrowUpRight size={17} aria-hidden="true" /></span>
          </a>
          <div className={styles.moreContact}>
            <p className={styles.moreLabel}>More ways to reach us</p>
            <div className={styles.moreRow}>
              {phoneNumbers.slice(1).map((phone) => <a key={phone.href} href={phone.href}>{phone.display}</a>)}
              {socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} · {link.handle}</a>)}
            </div>
            <p className={styles.amharic} lang="am">{amharicServices.join(" · ")}</p>
          </div>
        </motion.div>

        <motion.div
          className={styles.formPanel}
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {mode === "form" ? (
            <>
              <div className={styles.formIntro}>
                <span className={styles.eyebrow}>An invitation to imagine</span>
                <p>A few details, a world of possibility.</p>
              </div>
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                {Object.keys(errors).length > 0 && (
                  <p className={styles.errorSummary} role="alert" ref={errorRef} tabIndex={-1}>
                    {errors.form || "Please check the highlighted fields below."}
                  </p>
                )}
                <div className={styles.fields}>
                  <Field id={`${id}-name`} label="Your name" error={errors.name}>
                    <input {...inputProps("name")} autoComplete="name" placeholder="Full name" required maxLength={100} />
                  </Field>
                  <Field id={`${id}-phone`} label="Phone number" error={errors.phone}>
                    <input {...inputProps("phone")} type="tel" autoComplete="tel" placeholder="Your contact number" required maxLength={40} />
                  </Field>
                  <Field id={`${id}-email`} label="Email address" optional error={errors.email}>
                    <input {...inputProps("email")} type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} />
                  </Field>
                  <Field id={`${id}-eventType`} label="Occasion" error={errors.eventType}>
                    <select {...inputProps("eventType")} required>
                      <option value="">Select your occasion</option>
                      {EVENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </Field>
                  <Field id={`${id}-eventDate`} label="Preferred date" optional error={errors.eventDate}>
                    <input {...inputProps("eventDate")} type="date" min={today || undefined} />
                  </Field>
                  <Field id={`${id}-guestCount`} label="Number of guests" optional error={errors.guestCount}>
                    <input {...inputProps("guestCount")} type="number" inputMode="numeric" min={1} max={100000} step={1} placeholder="Estimated guest count" />
                  </Field>
                  <Field id={`${id}-budget`} label="Budget range" optional error={errors.budget}>
                    <input {...inputProps("budget")} placeholder="Your preferred range & currency" maxLength={160} />
                  </Field>
                  <Field id={`${id}-venue`} label="Venue or location" optional error={errors.venue}>
                    <input {...inputProps("venue")} placeholder="A venue, a city, or still deciding" maxLength={200} />
                  </Field>
                  <Field id={`${id}-message`} label="The feeling you have in mind" optional error={errors.message} full>
                    <textarea {...inputProps("message")} rows={3} maxLength={3000} placeholder="Tell us about the atmosphere, the details, the moment…" />
                  </Field>
                </div>

                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor={`${id}-website`}>Leave this field empty</label>
                  <input {...inputProps("website")} tabIndex={-1} autoComplete="off" />
                </div>
                <div className={styles.consentWrap}>
                  <label className={styles.consent} htmlFor={`${id}-consent`}>
                    <input
                      id={`${id}-consent`}
                      name="consent"
                      type="checkbox"
                      checked={fields.consent}
                      disabled={isSubmitting}
                      onChange={(event) => updateField("consent", event.target.checked)}
                      required
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                    />
                    <span>I agree that Timeless Decor and Event may contact me about this inquiry.</span>
                  </label>
                  {errors.consent && <p className={styles.fieldError} id={`${id}-consent-error`}>{errors.consent}</p>}
                </div>

                {submissionError && (
                  <div className={styles.deliveryError}>
                    <p role="alert">{submissionError}</p>
                    <button type="button" onClick={prepareManually} className={styles.textButton}>
                      Prepare a manual inquiry <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                )}

                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                  <span>{isSubmitting ? "Submitting your inquiry" : deliveryConfigured ? "Send my inquiry" : "Prepare my inquiry"}</span>
                  {isSubmitting
                    ? <LoaderCircle size={19} className={styles.spinner} aria-hidden="true" />
                    : <ArrowRight size={21} strokeWidth={1.4} aria-hidden="true" />}
                </button>
                <p className={styles.privacyNote}>
                  {deliveryConfigured
                    ? "Your details will be used to respond to this inquiry. Submitting a request does not confirm a booking."
                    : "Review your inquiry, then choose how to share it. Preparing this form does not send your details."}
                </p>
              </form>
            </>
          ) : (
            <div className={styles.reviewPanel}>
              <span className={styles.eyebrow}>{mode === "sent" ? "A beautiful beginning" : "One step closer"}</span>
              <h3 ref={reviewRef} tabIndex={-1}>
                {mode === "sent" ? "Your inquiry has been submitted." : "Your vision, ready to share."}
              </h3>
              <p className={styles.reviewStatus} role="status">
                {mode === "sent"
                  ? "The booking service has accepted your details. Please call the studio if you need to confirm availability."
                  : deliveryUnconfirmed
                    ? "Your inquiry is ready. Delivery could not be confirmed. Please contact the studio before sending again."
                    : "Your inquiry is ready. It has not been sent."}
              </p>
              <label htmlFor={`${id}-review`} className={styles.reviewLabel}>Your inquiry — select or copy the text</label>
              <textarea id={`${id}-review`} className={styles.reviewText} ref={textRef} value={reviewText} readOnly rows={11} spellCheck={false} />
              <div className={styles.handoffActions}>
                <button type="button" onClick={copyInquiry} className={styles.actionButton}>
                  {copyStatus.startsWith("Copied") ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  Copy inquiry
                </button>
                <button type="button" onClick={downloadInquiry} className={styles.actionButton}>
                  <Download size={16} aria-hidden="true" /> Save as text
                </button>
                {mode !== "sent" && (
                  <a href={`sms:+251941097286?body=${encodeURIComponent(reviewText)}`} className={`${styles.actionButton} ${styles.smsButton}`}>
                    <MessageSquare size={16} aria-hidden="true" /> Open SMS <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
              <p className={styles.copyStatus} aria-live="polite">{copyStatus}</p>
              {mode !== "sent" && <p className={styles.privacyNote}>SMS opens your device’s messaging app. Review the message and send it there when you are ready.</p>}
              <div className={styles.reviewFooter}>
                <button type="button" className={styles.textButton} onClick={editDetails}><ArrowLeft size={15} aria-hidden="true" /> Edit details</button>
                <a className={styles.textButton} href={PHONE_URI}>Call the studio <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

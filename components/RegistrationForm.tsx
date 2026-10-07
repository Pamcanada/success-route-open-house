"use client";
import { useEffect, useState } from "react";
import { eventConfig, EventLocation } from "@/config/eventConfig";
import { generateTimeSlots } from "@/lib/timeSlots";
import { submitRegistration } from "@/lib/registration";
import { readTracking, track, Utm } from "@/lib/tracking";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
type EventRow = {
  location: EventLocation;
  date: string;
  displayDate: string;
  startTime: string;
  endTime: string;
  intervalMinutes: number;
};
type Form = {
  location: "" | EventLocation;
  date: string;
  arrivalTime: string;
  fullName: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  status: string;
  expiryDate: string;
  query: string;
  leadSource: string;
  consent: boolean;
  website: string;
};
const initial: Form = {
  location: "",
  date: "",
  arrivalTime: "",
  fullName: "",
  address: "",
  city: "",
  province: "",
  phone: "",
  email: "",
  status: "",
  expiryDate: "",
  query: "",
  leadSource: "",
  consent: false,
  website: "",
};
const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];
const events: EventRow[] = [
  {
    location: "Brampton",
    date: "2026-10-10",
    displayDate: "October 10, 2026",
    startTime: "12:00",
    endTime: "18:00",
    intervalMinutes: 30,
  },
  {
    location: "Brampton",
    date: "2026-10-24",
    displayDate: "October 24, 2026",
    startTime: "12:00",
    endTime: "18:00",
    intervalMinutes: 30,
  },
  {
    location: "Halifax",
    date: "2026-10-17",
    displayDate: "October 17, 2026",
    startTime: "12:00",
    endTime: "18:00",
    intervalMinutes: 30,
  },
  {
    location: "Halifax",
    date: "2026-10-18",
    displayDate: "October 18, 2026",
    startTime: "12:00",
    endTime: "18:00",
    intervalMinutes: 30,
  },
];
export default function RegistrationForm({
  externalLocation,
}: {
  externalLocation?: EventLocation | null;
}) {
  const [f, setF] = useState<Form>(initial);
  const [utm, setUtm] = useState<Utm>({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<{ id: string; form: Form } | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const u = readTracking(q);
    setUtm(u);
    const loc = q.get("location")?.toLowerCase();
    if (loc === "brampton" || loc === "halifax") {
      setF((x) => ({
        ...x,
        location: loc === "brampton" ? "Brampton" : "Halifax",
        leadSource: u.utmSource === "qr" ? "QR Code" : x.leadSource,
      }));
      setTimeout(
        () => document.getElementById("registration")?.scrollIntoView(),
        100,
      );
    } else if (u.utmSource === "qr")
      setF((x) => ({ ...x, leadSource: "QR Code" }));
    if (u.utmSource === "qr") track("QRCodeLanding");
  }, []);
  useEffect(() => {
    if (externalLocation) {
      setF((x) => ({
        ...x,
        location: externalLocation,
        date: "",
        arrivalTime: "",
      }));
      setTimeout(
        () =>
          document
            .getElementById("registration")
            ?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    }
  }, [externalLocation]);
  const dates = events.filter((e) => e.location === f.location);
  const selected = events.find(
    (e) => e.location === f.location && e.date === f.date,
  );
  const slots = selected
    ? generateTimeSlots(
        selected.startTime,
        selected.endTime,
        selected.intervalMinutes,
      )
    : [];
  function update<K extends keyof Form>(k: K, v: Form[K]) {
    setF((x) => ({
      ...x,
      [k]: v,
      ...(k === "location" ? { date: "", arrivalTime: "" } : {}),
      ...(k === "date" ? { arrivalTime: "" } : {}),
    }));
    setErrors((x) => ({ ...x, [k]: "" }));
    if (k === "location") track("LocationSelected", { location: v });
    if (k === "date") track("DateSelected", { date: v });
    if (k === "arrivalTime") track("ArrivalTimeSelected", { time: v });
  }
  function validate() {
    const e: Record<string, string> = {};
    if (!f.location) e.location = "Please select an event location.";
    if (!f.date) e.date = "Please select an event date.";
    if (!f.arrivalTime)
      e.arrivalTime = "Please select your preferred arrival time.";
    if (!f.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!f.address.trim()) e.address = "Please enter your address.";
    if (!f.city.trim()) e.city = "Please enter your city.";
    if (!f.province) e.province = "Please select your province.";
    if (!/^\+?[0-9 ()-]{7,20}$/.test(f.phone))
      e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      e.email = "Please enter a valid email address.";
    if (!f.status) e.status = "Please select your current status in Canada.";
    if (!f.expiryDate) e.expiryDate = "Please enter your status expiry date.";
    if (!f.consent) e.consent = "Please accept the consent statement.";
    return e;
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setBusy(true);
    setServerError("");
    track("RegisterButtonClick");
    try {
      const r = await submitRegistration(eventConfig.googleAppsScriptURL, {
        ...f,
        ...utm,
      });
      if (!r.success) {
        setServerError(r.message || "Registration could not be completed.");
        return;
      }
      setDone({ id: r.registrationId, form: f });
      track("RegistrationCompleted", { location: f.location, date: f.date });
    } catch {
      setServerError(
        "We're having trouble completing your registration right now. Please try again or contact Success Route at 437-299-8585.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (done) {
    const d = events.find((e) => e.date === done.form.date);
    const loc = done.form.location as EventLocation;
    const first = done.form.fullName.trim().split(/\s+/)[0];
    const wa = `Hi Success Route, I have registered for the Free Immigration Open House.\n\nRegistration ID: ${done.id}\nLocation: ${loc}\nDate: ${d?.displayDate || done.form.date}\nPreferred Arrival Time: ${done.form.arrivalTime}`;
    const details = `Success Route Free Immigration Open House\nRegistration ID: ${done.id}\nLocation: ${loc}\nDate: ${d?.displayDate || done.form.date}\nPreferred Arrival Time: ${done.form.arrivalTime}\nAddress: ${eventConfig.addresses[loc]}`;
    return (
      <section id="registration" className="section bg-[var(--cream)]">
        <div className="container max-w-3xl">
          <div className="card p-7 md:p-10">
            <div className="eyebrow">YOU&apos;RE REGISTERED!</div>
            <h2 className="mt-2 text-3xl font-black text-[var(--teal)]">
              Thank you, {first}!
            </h2>
            <p className="mt-3">
              Your registration for the Success Route Free Immigration Open
              House has been received. We look forward to welcoming you.
            </p>
            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
              <p>
                <b>Registration ID</b>
                <br />
                {done.id}
              </p>
              <p>
                <b>Location</b>
                <br />
                {loc}
              </p>
              <p>
                <b>Date</b>
                <br />
                {d?.displayDate}
              </p>
              <p>
                <b>Preferred Arrival Time</b>
                <br />
                {done.form.arrivalTime}
              </p>
              <p className="sm:col-span-2">
                <b>Address</b>
                <br />
                {eventConfig.addresses[loc]}
              </p>
            </div>
            <p className="mt-5 text-sm text-slate-600">
              Your selected arrival time helps us plan for attendance. As this
              is an Open House, it is not a private appointment time. Please
              keep your registration details for reference.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                target="_blank"
                href={googleCalendarUrl(
                  done.form.date,
                  done.form.arrivalTime,
                  loc,
                  done.id,
                )}
                onClick={() => track("CalendarClick")}
              >
                ADD TO CALENDAR
              </a>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  downloadIcs(
                    done.form.date,
                    done.form.arrivalTime,
                    loc,
                    done.id,
                  )
                }
              >
                DOWNLOAD .ICS
              </button>
              <a
                className="btn btn-secondary"
                target="_blank"
                href={`https://wa.me/${eventConfig.whatsappNumber}?text=${encodeURIComponent(wa)}`}
              >
                WHATSAPP US
              </a>
              <button
                className="btn btn-secondary"
                onClick={() => navigator.clipboard.writeText(details)}
              >
                COPY REGISTRATION DETAILS
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  const err = (k: string) =>
    errors[k] ? (
      <p className="error" role="alert">
        {errors[k]}
      </p>
    ) : null;
  return (
    <section id="registration" className="section bg-[var(--cream)]">
      <div className="container max-w-4xl">
        <div className="card p-6 md:p-10">
          <div className="eyebrow">FREE REGISTRATION</div>
          <h2 className="mt-2 text-3xl font-black text-[var(--teal)]">
            RESERVE YOUR FREE SPOT
          </h2>
          <p className="mt-2 text-slate-600">
            Select your preferred location, date and approximate arrival time,
            then complete your basic details.
          </p>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs font-bold">
            <span>1. LOCATION</span>
            <span>2. DATE</span>
            <span>3. ARRIVAL TIME</span>
            <span>4. YOUR DETAILS</span>
          </div>
          <form
            className="mt-8 grid gap-5 md:grid-cols-2"
            onSubmit={submit}
            onFocus={() => track("FormStarted")}
            noValidate
          >
            <div>
              <label htmlFor="location">Preferred Location *</label>
              <select
                id="location"
                className="field mt-2"
                value={f.location}
                onChange={(e) =>
                  update("location", e.target.value as Form["location"])
                }
              >
                <option value="">Select Location</option>
                <option>Brampton</option>
                <option>Halifax</option>
              </select>
              {err("location")}
            </div>
            <div>
              <label htmlFor="date">Preferred Date *</label>
              <select
                id="date"
                className="field mt-2"
                disabled={!f.location}
                value={f.date}
                onChange={(e) => update("date", e.target.value)}
              >
                <option value="">Select Date</option>
                {dates.map((x) => (
                  <option key={x.date} value={x.date}>
                    {x.displayDate}
                  </option>
                ))}
              </select>
              {err("date")}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="time">Preferred Arrival Time *</label>
              <p className="text-sm text-slate-500">
                Choose your approximate arrival time. This is an open house, not
                an appointment, and there is no capacity limit.
              </p>
              <select
                id="time"
                className="field mt-2"
                disabled={!f.date || slots.length === 0}
                value={f.arrivalTime}
                onChange={(e) => update("arrivalTime", e.target.value)}
              >
                <option value="">
                  Select Arrival Time
                </option>
                {slots.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              {err("arrivalTime")}
            </div>
            {(
              [
                ["fullName", "Full Name *", "text"],
                ["address", "Address *", "text"],
                ["city", "City *", "text"],
                ["phone", "Phone Number *", "tel"],
                ["email", "Email Address *", "email"],
                ["expiryDate", "Status Expiry Date *", "date"],
              ] as const
            ).map(([k, l, t]) => (
              <div key={k}>
                <label htmlFor={k}>{l}</label>
                <input
                  id={k}
                  type={t}
                  className="field mt-2"
                  value={f[k]}
                  onChange={(e) => update(k, e.target.value)}
                />
                {err(k)}
              </div>
            ))}
            <div>
              <label htmlFor="province">Province *</label>
              <select
                id="province"
                className="field mt-2"
                value={f.province}
                onChange={(e) => update("province", e.target.value)}
              >
                <option value="">Select Province</option>
                {provinces.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              {err("province")}
            </div>
            <div>
              <label htmlFor="status">Current Status in Canada *</label>
              <select
                id="status"
                className="field mt-2"
                value={f.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="">Select Status</option>
                {[
                  "Study Permit",
                  "PGWP",
                  "Work Permit",
                  "Visitor",
                  "Maintained Status",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              {err("status")}
            </div>
            <div>
              <label htmlFor="source">How did you hear about us?</label>
              <select
                id="source"
                className="field mt-2"
                value={f.leadSource}
                onChange={(e) => update("leadSource", e.target.value)}
              >
                <option value="">Select Source</option>
                {[
                  "Instagram",
                  "Facebook",
                  "TikTok",
                  "WhatsApp",
                  "Google",
                  "Friend / Referral",
                  "Success Route Client",
                  "QR Code",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="query">
                Do you have a specific immigration question you would like to
                discuss?
              </label>
              <textarea
                id="query"
                className="field mt-2 min-h-28"
                maxLength={500}
                placeholder="Tell us briefly what you would like guidance with. This is optional."
                value={f.query}
                onChange={(e) => update("query", e.target.value)}
              />
              <div className="text-right text-xs text-slate-500">
                {f.query.length}/500
              </div>
            </div>
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              name="website"
              value={f.website}
              onChange={(e) => update("website", e.target.value)}
            />
            <div className="md:col-span-2">
              <label className="flex gap-3 font-normal">
                <input
                  type="checkbox"
                  checked={f.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                />
                <span>
                  I agree to be contacted by Success Route regarding this Open
                  House and related consultation services.
                </span>
              </label>
              {err("consent")}
              <p className="mt-3 text-sm text-slate-500">
                Attendance at this event does not guarantee eligibility or
                approval under any Canadian immigration program.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Your information will be used by Success Route to manage your
                Open House registration and contact you regarding this event and
                related consultation services.
              </p>
            </div>
            {serverError && (
              <div
                role="alert"
                className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
              >
                {serverError}{" "}
                <a
                  className="font-bold underline"
                  target="_blank"
                  href={`https://wa.me/${eventConfig.whatsappNumber}`}
                >
                  WhatsApp us
                </a>
                .
              </div>
            )}
            <div className="md:col-span-2">
              <button
                disabled={busy}
                className="btn btn-primary w-full disabled:opacity-60"
              >
                {busy ? "REGISTERING..." : "REGISTER FOR FREE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

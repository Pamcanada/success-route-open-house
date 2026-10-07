import { eventConfig } from "@/config/eventConfig";
import LocalPhoto from "@/components/LocalPhoto";
export default function Hero() {
  return (
    <section id="top" className="hero section">
      <div className="container grid gap-10 md:grid-cols-2 md:items-center">
        <div className="max-w-2xl">
          <div className="eyebrow">OCTOBER 2026</div>
          <h1 className="mt-3 text-4xl font-black leading-[1.04] text-[var(--teal)] sm:text-5xl lg:text-6xl">
            FREE
            <br />
            IMMIGRATION
            <br />
            <span className="text-[var(--red)]">OPEN HOUSE</span>
            <br />
            SEMINAR
          </h1>
          <p className="mt-4 font-extrabold text-[var(--gold)]">
            FREE ENTRY • REGISTRATION REQUIRED
          </p>
          <h2 className="mt-6 text-2xl font-bold">
            Explore Immigration Pathways in Canada
          </h2>
          <p className="mt-3 max-w-xl text-lg text-slate-600">
            Meet the Success Route team and learn about potential Canadian
            immigration pathways based on your individual profile.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#registration" className="btn btn-primary">
              REGISTER FOR FREE
            </a>
            <a href="#locations" className="btn btn-secondary">
              VIEW DATES & LOCATIONS
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <LocalPhoto
            src="/images/student-1.png"
            alt="International students in a welcoming Canadian campus setting"
            placeholder="Student banner"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[2/1] w-full overflow-hidden rounded-xl"
          />
          <div className="mt-4 flex flex-col gap-2 border-l-4 border-[var(--gold)] pl-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">IMMIGRATION PATHWAYS IN CANADA</p>
              <p className="mt-1 font-black text-[var(--teal)]">
                BRAMPTON & HALIFAX
              </p>
            </div>
            <p className="text-sm font-bold text-[var(--teal)]">
              OPEN HOUSE HOURS · 12:00 PM – 6:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

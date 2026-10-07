const attend = [
  "International Students",
  "PGWP Holders",
  "Work Permit Holders",
  "Visitors",
  "Healthcare Workers",
  "PSWs / CCAs",
  "International Graduates",
  "Skilled Workers",
  "Francophone Applicants",
  "People exploring Provincial Nominee Programs",
  "People who are unsure about their immigration options",
];
const topics = [
  "Express Entry",
  "Canadian Experience Class",
  "Provincial Nominee Programs",
  "Ontario Immigration Pathways",
  "Nova Scotia Immigration Pathways",
  "Francophone Immigration",
  "Healthcare / CCA Pathways",
  "International Graduate Pathways",
  "Study-to-PR Planning",
  "Other Immigration Options",
];
export default function InfoSections() {
  return (
    <>
      <section className="section bg-[var(--cream)]">
        <div className="container">
          <h2 className="text-3xl font-black text-[var(--teal)]">
            WHO SHOULD ATTEND?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {attend.map((x) => (
              <div
                key={x}
                className="rounded-2xl bg-white p-4 font-semibold shadow-sm"
              >
                ✓ {x}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-black text-[var(--teal)]">
            EXPLORE YOUR IMMIGRATION OPTIONS
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topics.map((x) => (
              <div key={x} className="card p-5 font-bold">
                {x}
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="card flex h-full flex-col items-start p-6 sm:p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--teal)]/10 text-[var(--teal)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                  />
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-black text-[var(--teal)]">
                Personal Guidance for Your Next Step
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Meet our team and explore immigration pathways that may be
                relevant to your individual profile.
              </p>
            </article>
            <article className="card flex h-full flex-col items-start p-6 sm:p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--teal)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.5c-1.6-1.3-3.6-2-6-2H3v15h3c2.4 0 4.4.7 6 2 1.6-1.3 3.6-2 6-2h3v-15h-3c-2.4 0-4.4.7-6 2Zm0 0v15"
                  />
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-black text-[var(--teal)]">
                Explore Your Options in Canada
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Learn about immigration, education and career pathways and
                understand possible next steps.
              </p>
            </article>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Immigration programs and eligibility requirements vary. Individual
            eligibility depends on personal circumstances and applicable
            Canadian immigration requirements.
          </p>
        </div>
      </section>
    </>
  );
}

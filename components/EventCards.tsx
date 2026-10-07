import type { EventLocation } from "@/config/eventConfig";
const eventDates: Record<EventLocation, readonly string[]> = {
  Brampton: ["October 10, 2026", "October 24, 2026"],
  Halifax: ["October 17, 2026", "October 18, 2026"],
};
export default function EventCards({
  choose,
}: {
  choose: (l: EventLocation) => void;
}) {
  return (
    <section id="locations" className="section">
      <div className="container">
        <div className="text-center">
          <div className="eyebrow">DATES & LOCATIONS</div>
          <h2 className="mt-2 text-3xl font-black text-[var(--teal)]">
            Choose your Open House
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {(["Brampton", "Halifax"] as const).map((loc) => (
            <article key={loc} className="card rounded-lg p-6 md:p-7">
              <div className="eyebrow">{loc.toUpperCase()}</div>
              <div className="mt-4 space-y-1 text-lg font-bold text-[var(--teal)]">
                {eventDates[loc].map((date) => (
                  <p key={date}>{date}</p>
                ))}
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="eyebrow">OPEN HOUSE HOURS</p>
                <p className="mt-1 font-bold text-[var(--teal)]">
                  12:00 PM – 6:00 PM
                </p>
              </div>
              <p className="mt-4 text-slate-600">
                {loc === "Brampton" ? (
                  <>
                    Suite 325, 3rd Floor
                    <br />
                    2 County Court Blvd
                    <br />
                    Brampton, ON L6W 3W8
                  </>
                ) : (
                  <>
                    Suite 1301, 13th Floor
                    <br />
                    1959 Upper Water Street
                    <br />
                    Halifax, NS B3J 3N2
                  </>
                )}
              </p>
              <button
                className="btn btn-primary mt-6 w-full"
                onClick={() => choose(loc)}
              >
                REGISTER – {loc.toUpperCase()}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

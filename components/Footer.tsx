import { eventConfig } from "@/config/eventConfig";
import LocalPhoto from "@/components/LocalPhoto";
export default function Footer() {
  return (
    <footer className="bg-[var(--teal)] py-12 text-white">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <a href="/#top" aria-label="Success Route Inc. home" className="mb-4 block w-fit">
            <LocalPhoto
              src="/success-route-logo.png"
              alt={eventConfig.companyName}
              placeholder="Logo placeholder"
              fit="contain"
              className="h-9 w-40"
            />
          </a>
          <h3 className="text-xl font-black">Success Route Inc.</h3>
          <p className="mt-3">
            {eventConfig.phone}
            <br />
            successroute.ca
          </p>
        </div>
        <div>
          <b>BRAMPTON</b>
          <p className="mt-2">
            Suite 325, 3rd Floor
            <br />2 County Court Blvd
            <br />
            Brampton, ON L6W 3W8
          </p>
        </div>
        <div>
          <b>HALIFAX</b>
          <p className="mt-2">
            Suite 1301, 13th Floor
            <br />
            1959 Upper Water Street
            <br />
            Halifax, NS B3J 3N2
          </p>
        </div>
      </div>
      <div className="container mt-8 border-t border-white/20 pt-6 text-sm text-white/75">
        Immigration information provided at this event is general in nature.
        Eligibility depends on individual circumstances and applicable Canadian
        immigration laws, regulations and program requirements.
      </div>
    </footer>
  );
}

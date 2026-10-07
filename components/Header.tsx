import LocalPhoto from "@/components/LocalPhoto";
import { eventConfig } from "@/config/eventConfig";
export default function Header() {
  return (
      <header className="border-b border-[var(--teal)]/10 bg-white">
        <div className="container grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 md:flex md:justify-between md:py-0">
          <a
            href="/#top"
            aria-label="Success Route Inc. home"
            className="relative block aspect-[936/449] w-32 sm:w-36 md:w-40"
          >
            <LocalPhoto
              src="/images/logo-sr.webp"
              alt={eventConfig.companyName}
              placeholder="Success Route logo"
              fit="contain"
              className="h-full w-full"
            />
          </a>
          <div className="grid justify-items-end gap-1 sm:flex sm:items-center sm:gap-4">
            <a
              href={`tel:${eventConfig.phone.replace(/-/g, "")}`}
              className="text-sm font-bold text-[var(--teal)] sm:text-base"
            >
              {eventConfig.phone}
            </a>
            <a
              href="#registration"
              className="btn btn-primary whitespace-nowrap px-3 py-2 text-xs sm:px-4 sm:text-sm"
            >
              REGISTER FOR FREE
            </a>
          </div>
        </div>
    </header>
  );
}

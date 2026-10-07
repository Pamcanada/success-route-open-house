"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventCards from "@/components/EventCards";
import InfoSections from "@/components/InfoSections";
import RegistrationForm from "@/components/RegistrationForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RegistrationQRCode from "@/components/RegistrationQRCode";
import { EventLocation } from "@/config/eventConfig";
export default function Home() {
  const [loc, setLoc] = useState<EventLocation | null>(null);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventCards choose={(l) => setLoc(l)} />
        <RegistrationQRCode />
        <InfoSections />
        <RegistrationForm externalLocation={loc} />
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-black text-[var(--teal)]">
              WHY SUCCESS ROUTE?
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "10+ Years of Experience",
                "Immigration & Education Guidance",
                "Regulated Canadian Immigration Consultant Support",
                "Offices in Ontario and Nova Scotia",
                "Serving clients from around the world",
              ].map((x) => (
                <div className="card p-5 font-bold" key={x}>
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <button
        onClick={() =>
          document
            .getElementById("registration")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="mobile-sticky fixed bottom-0 left-0 z-30 w-full items-center justify-center bg-[var(--red)] p-4 font-black text-white"
      >
        REGISTER FREE
      </button>
    </>
  );
}

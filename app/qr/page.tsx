import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QRCodeCard from "@/components/QRCodeCard";
import { qrLinks } from "@/lib/qr";

const qrCards = [
  {
    key: "general",
    title: "General Open House Registration",
    description: "Free Immigration Open House – Brampton & Halifax.",
    filename: "success-route-open-house-registration",
  },
  {
    key: "brampton",
    title: "Brampton Registration",
    description: "Opens registration with Brampton selected.",
    filename: "success-route-brampton-registration",
  },
  {
    key: "halifax",
    title: "Halifax Registration",
    description: "Opens registration with Halifax selected.",
    filename: "success-route-halifax-registration",
  },
] as const;

export default function QRPage() {
  const links = qrLinks();

  return (
    <>
      <Header />
      <main className="section">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">SUCCESS ROUTE INC.</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--teal)] sm:text-4xl">
                Open House Registration QR Codes
              </h1>
            </div>
            <a className="btn btn-secondary qr-no-print" href="/#registration">
              REGISTER ONLINE
            </a>
          </div>
          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {qrCards.map((card) => (
              <QRCodeCard
                key={card.key}
                title={card.title}
                description={card.description}
                url={links[card.key]}
                filename={card.filename}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
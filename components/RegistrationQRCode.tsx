import QRCodeCard from "@/components/QRCodeCard";
import { qrLinks } from "@/lib/qr";

export default function RegistrationQRCode() {
  const links = qrLinks();

  return (
    <section aria-labelledby="scan-to-register" className="section pt-0">
      <div className="container">
        <QRCodeCard
          title="SCAN TO REGISTER"
          description="Free Immigration Open House – Brampton & Halifax."
          url={links.general}
          filename="success-route-open-house-registration"
          featured
        />
      </div>
    </section>
  );
}
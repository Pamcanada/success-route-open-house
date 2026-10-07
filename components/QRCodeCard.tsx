"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

type QRAssets = {
  png: string;
  svg: string;
};

type QRCodeCardProps = {
  title: string;
  description: string;
  url: string | null;
  filename: string;
  featured?: boolean;
};

export default function QRCodeCard({
  title,
  description,
  url,
  filename,
  featured = false,
}: QRCodeCardProps) {
  const [assets, setAssets] = useState<QRAssets | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setAssets(null);
    setFailed(false);

    if (url) {
      const options = {
        width: 960,
        margin: 4,
        errorCorrectionLevel: "H" as const,
        color: { dark: "#073b3a", light: "#ffffff" },
      };

      Promise.all([
        QRCode.toDataURL(url, options),
        QRCode.toString(url, { ...options, type: "svg" }),
      ])
        .then(([png, svg]) => {
          if (active) setAssets({ png, svg });
        })
        .catch(() => {
          if (active) setFailed(true);
        });
    }

    return () => {
      active = false;
    };
  }, [url]);

  const printMessage = "QR code will activate when the registration URL is connected";

  return (
    <article
      className={`qr-print-card card rounded-lg border-[var(--gold)]/40 p-5 sm:p-7 ${featured ? "" : "h-full"}`}
    >
      <div className={featured ? "grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_15rem]" : "flex h-full flex-col"}>
        <div>
          <h2
            id={featured ? "scan-to-register" : undefined}
            className="text-xl font-black text-[var(--teal)]"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          {!url ? (
            <p className="mt-4 rounded-md border border-[var(--gold)]/50 bg-[var(--cream)] p-3 text-sm font-semibold text-[var(--teal)]">
              {printMessage}
            </p>
          ) : failed ? (
            <p className="mt-4 text-sm font-semibold text-[var(--red)]" role="alert">
              The QR code could not be generated. Check the registration URL configuration.
            </p>
          ) : assets ? (
            <div className="mt-5 flex flex-wrap gap-2 qr-no-print">
              <a
                className="btn btn-primary px-4 py-2 text-sm"
                download={`${filename}.png`}
                href={assets.png}
              >
                DOWNLOAD PNG
              </a>
              <a
                className="btn btn-secondary px-4 py-2 text-sm"
                download={`${filename}.svg`}
                href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(assets.svg)}`}
              >
                DOWNLOAD SVG
              </a>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500" aria-live="polite">
              Preparing QR code…
            </p>
          )}
        </div>
        {url && assets && (
          <div className="mx-auto mt-5 w-full max-w-60 rounded-md bg-white p-3 sm:mt-0">
            <img
              src={assets.png}
              alt={`QR code for ${title}`}
              width={960}
              height={960}
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </article>
  );
}
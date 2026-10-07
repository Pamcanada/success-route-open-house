"use client";

import Image from "next/image";
import { useState } from "react";

type LocalPhotoProps = {
  src: string;
  alt: string;
  placeholder: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
};

export default function LocalPhoto({
  src,
  alt,
  placeholder,
  className = "",
  sizes = "100vw",
  priority = false,
  fit = "cover",
}: LocalPhotoProps) {
  const [missing, setMissing] = useState(false);
  const isLogo = fit === "contain";

  return (
    <div className={`relative ${className}`}>
      {!missing && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          onError={() => setMissing(true)}
        />
      )}
      {missing && (
        <div
          role="img"
          aria-label={`${alt}. ${placeholder}`}
          className={`local-photo-placeholder absolute inset-0 flex flex-col justify-between overflow-hidden p-4 text-[var(--teal)] ${isLogo ? "local-photo-placeholder-logo items-start" : "items-center text-center"}`}
        >
          <span className="text-[0.6rem] font-black uppercase">
            {isLogo ? "LOGO PLACEHOLDER" : "PHOTO PLACEHOLDER"}
          </span>
          <span className="max-w-full break-words text-xs font-semibold sm:text-sm">
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}
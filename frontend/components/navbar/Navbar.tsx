"use client";

import { useEffect, useState } from "react";
import NavbarA from "./NavbarA";
import NavbarB from "./NavbarB";

function getVariantFromQuery(): "A" | "B" | null {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get("nav");
  return v === "A" || v === "B" ? v : null;
}

export default function Navbar() {
  const [variant, setVariant] = useState<"A" | "B">(
    (process.env.NEXT_PUBLIC_NAV_VARIANT as "A" | "B") || "A"
  );

  useEffect(() => {
    const q = getVariantFromQuery();
    if (q) setVariant(q);
  }, []);

  return variant === "B" ? <NavbarB /> : <NavbarA />;
}

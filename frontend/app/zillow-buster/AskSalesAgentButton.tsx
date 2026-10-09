"use client";

// Opens the site's existing LGR Connect chat widget (mounted by
// app/layout.tsx) and sends the visitor's question to the AI sales
// agent configured for this page (content.ts PROSPECTOR_WIDGET_CONFIG).
//
// The shared widget has no public "open" API yet, so this drives it only
// through the same DOM elements and events a visitor uses: clicking the
// widget container expands it (widget.js `chat` click handler), and the
// send button sends whatever is in the input (widget.js sendMessage()).
// No shared widget code is changed. If the widget isn't on the page (its
// script failed to load or is blocked), the button falls back to the
// existing intake form so a visitor is never left with a dead button.

import { useRouter } from "next/navigation";

const WIDGET_CONTAINER_ID = "lgr-chat-container";
const WIDGET_INPUT_ID = "lgr-input";
const WIDGET_SEND_ID = "lgr-send-btn";

export function openSalesAgent(seed?: string): boolean {
  if (typeof document === "undefined") return false;
  const container = document.getElementById(WIDGET_CONTAINER_ID);
  if (!container) return false;

  container.click();

  const input = document.getElementById(WIDGET_INPUT_ID) as HTMLInputElement | null;
  if (!input) return true;

  if (seed) {
    input.value = seed;
    document.getElementById(WIDGET_SEND_ID)?.click();
  } else {
    input.focus();
  }
  return true;
}

export default function AskSalesAgentButton({
  seed,
  fallbackHref,
  className,
  children,
}: {
  seed?: string;
  fallbackHref: string;
  className: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  function onClick() {
    if (!openSalesAgent(seed)) router.push(fallbackHref);
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

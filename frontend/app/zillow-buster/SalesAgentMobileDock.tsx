"use client";

// The shared LGR Connect widget starts expanded (widget.js:434), and on
// phones its expanded panel is 78vh tall (widget.js:419-425), which
// covers this sales page's hero on arrival. On this page only, and only
// on phone-width screens, dock the widget collapsed once it mounts: the
// AI sales agent stays visible as its header bar, and tapping it (or any
// "Ask our AI sales agent" button, see AskSalesAgentButton.tsx) opens
// it. Uses the widget's own toggle button - no shared widget change.
// Desktop keeps the widget's default expanded panel.

import { useEffect } from "react";

const PHONE_MAX_WIDTH = 480; // matches widget.js's own phone breakpoint

export default function SalesAgentMobileDock() {
  useEffect(() => {
    if (window.innerWidth > PHONE_MAX_WIDTH) return;

    let done = false;
    function dock(): boolean {
      const container = document.getElementById("lgr-chat-container");
      const toggle = document.getElementById("lgr-toggle");
      if (!container || !toggle) return false;
      if (container.classList.contains("expanded")) toggle.click();
      done = true;
      return true;
    }

    if (dock()) return;
    const observer = new MutationObserver(() => {
      if (!done && dock()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 15000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
}

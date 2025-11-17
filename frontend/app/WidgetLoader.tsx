"use client";

import { useEffect } from "react";

export default function WidgetLoader() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/widget/klirchat-widget.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    // keep the widget script attached
    return () => {};
  }, []);

  return null;
}

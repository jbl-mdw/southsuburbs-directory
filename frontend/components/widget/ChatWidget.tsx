"use client";

import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Avoid duplicates if already loaded
    if (document.querySelector('script[data-klirchat="true"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "/widget/klirchat-widget.js";
    script.async = true;
    script.defer = true;

    script.dataset.klirchat = "true";

    document.body.appendChild(script);

    return () => {
      // Keep widget alive across navigations
    };
  }, []);

  return null;
};

export default ChatWidget;

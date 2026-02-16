'use client';

import { useEffect, useState } from 'react';

export default function TestWidgetPage() {
  const [status, setStatus] = useState('Injecting widget.js…');

  useEffect(() => {
    const id = 'ssb-widget-js';
    const src = 'https://southsuburbsbest.com/widget.js';

    // Avoid duplicate injection
    if (document.getElementById(id)) {
      setStatus('widget.js already present. If widget does not appear, check console for JS errors.');
      return;
    }

    const s = document.createElement('script');
    s.id = id;
    s.src = src;
    s.async = true;

    s.onload = () => setStatus('widget.js loaded. Widget should mount bottom-right.');
    s.onerror = () => setStatus('FAILED to load widget.js');

    document.head.appendChild(s);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Test Widget</h1>
      <p style={{ opacity: 0.8, marginBottom: 12 }}>
        Status: <code>{status}</code>
      </p>
      <p style={{ opacity: 0.8 }}>
        Expected: widget appears fixed at bottom-right.
      </p>
    </main>
  );
}

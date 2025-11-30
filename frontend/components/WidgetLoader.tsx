'use client';

import { useEffect } from 'react';

export function WidgetLoader() {
  useEffect(() => {
    console.log('⚡ Widget Loader mounting...');

    // Widget configuration
    (window as any).LGR_AGENT_CONFIG = {
      apiUrl: 'https://agent.klirtrak.com',
      agentId: '419aa1cc-6b80-4a69-95cb-7a688536bc29'
    };

    // Check if already loaded
    if (document.getElementById('lgr-widget-script')) {
      console.log('✅ Widget already loaded');
      return;
    }

    // Load script
    const script = document.createElement('script');
    script.id = 'lgr-widget-script';
    script.src = 'https://agent.klirtrak.com/widget.js';
    script.async = true;
    script.onload = () => console.log('✅ Widget loaded successfully');
    script.onerror = (e) => console.error('❌ Widget failed to load', e);
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById('lgr-widget-script');
      if (s) document.body.removeChild(s);
    };
  }, []);

  return null;
}

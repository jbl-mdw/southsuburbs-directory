'use client';

import { useEffect } from 'react';

export function ChatProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('⚡ Voice Agent ChatProvider mounting...');
    
    // Widget configuration for South Suburbs Best
    (window as any).LGR_AGENT_CONFIG = {
      apiUrl: 'https://agent.klirtrak.com',
      agentId: '419aa1cc-6b80-4a69-95cb-7a688536bc29'
    };

    // Check if script already loaded
    if (document.getElementById('lgr-widget-script')) {
      console.log('✅ Widget script already loaded');
      return;
    }

    // Load widget script
    const script = document.createElement('script');
    script.id = 'lgr-widget-script';
    script.src = 'https://agent.klirtrak.com/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('✅ Voice Agent widget loaded successfully');
    };
    script.onerror = (e) => {
      console.error('❌ Failed to load Voice Agent widget', e);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById('lgr-widget-script');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return <>{children}</>;
}

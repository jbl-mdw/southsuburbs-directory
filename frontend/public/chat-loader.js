console.log("🚀 LGR Loader Starting...");
window.LGR_AGENT_CONFIG = {
  apiUrl: 'https://agent.klirtrak.com',
  agentId: '419aa1cc-6b80-4a69-95cb-7a688536bc29'
};

var script = document.createElement('script');
script.src = "https://agent.klirtrak.com/widget.js";
script.async = true;
document.head.appendChild(script);

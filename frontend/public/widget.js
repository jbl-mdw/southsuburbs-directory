(function() {
  const config = window.LGR_AGENT_CONFIG || {};
  const endpoint = config.apiUrl || 'https://agent.klirtrak.com';

  const style = document.createElement('style');
  style.innerHTML = `
    .lgr-container { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif; display: flex; flex-direction: column; align-items: flex-end; }
    .lgr-bubble { width: 60px; height: 60px; background: #4F46E5; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
    .lgr-bubble:hover { transform: scale(1.05); }
    .lgr-window { width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); display: none; flex-direction: column; overflow: hidden; margin-bottom: 15px; border: 1px solid #ddd; }
    .lgr-head { background: #4F46E5; color: white; padding: 15px; font-weight: bold; display: flex; justify-content: space-between; }
    .lgr-body { flex: 1; padding: 15px; overflow-y: auto; background: #f9f9f9; display: flex; flex-direction: column; gap: 10px; }
    .lgr-msg { padding: 8px 12px; border-radius: 10px; font-size: 14px; max-width: 80%; line-height: 1.4; }
    .lgr-bot { background: #e0e7ff; color: #333; align-self: flex-start; }
    .lgr-user { background: #4F46E5; color: white; align-self: flex-end; }
    .lgr-foot { padding: 10px; border-top: 1px solid #eee; background: white; }
    .lgr-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; }
  `;
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.className = 'lgr-container';
  box.innerHTML = `
    <div class="lgr-window">
      <div class="lgr-head"><span>AI Support</span><span style="cursor:pointer;" class="lgr-close">✕</span></div>
      <div class="lgr-body"><div class="lgr-msg lgr-bot">Hello! How can I help you?</div></div>
      <div class="lgr-foot"><input type="text" class="lgr-input" placeholder="Type a message..." /></div>
    </div>
    <div class="lgr-bubble">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </div>
  `;
  document.body.appendChild(box);

  const win = box.querySelector('.lgr-window');
  const bubble = box.querySelector('.lgr-bubble');
  const msgs = box.querySelector('.lgr-body');
  const input = box.querySelector('.lgr-input');
  const close = box.querySelector('.lgr-close');

  const toggle = () => {
    const isVis = win.style.display === 'flex';
    win.style.display = isVis ? 'none' : 'flex';
    bubble.style.display = isVis ? 'flex' : 'none';
  };
  bubble.onclick = toggle;
  close.onclick = toggle;

  const addMsg = (txt, who) => {
    const d = document.createElement('div');
    d.className = `lgr-msg lgr-${who}`;
    d.innerText = txt;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  };

  input.onkeypress = async (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const txt = input.value;
      input.value = '';
      addMsg(txt, 'user');

      try {
        const res = await fetch(`${endpoint}/api/conversations/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId: config.agentId, message: txt })
        });
        const data = await res.json();
        if (data.success) {
          addMsg(data.data.response, 'bot');
        } else {
          addMsg("Error connecting to agent.", 'bot');
        }
      } catch (err) {
        console.error(err);
        addMsg("Connection failed.", 'bot');
      }
    }
  };
})();

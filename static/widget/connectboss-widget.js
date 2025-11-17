(function() {
  const script = document.currentScript;
  const config = {
    apiUrl: script.src.split('/widget/')[0],
    niche: script.getAttribute('data-niche') || 'business',
    businessName: script.getAttribute('data-business') || 'Our Business',
    phone: script.getAttribute('data-phone') || '',
    email: script.getAttribute('data-email') || '',
    primaryColor: script.getAttribute('data-color') || '#667eea',
    enableChat: script.getAttribute('data-chat') !== 'false',
    enableCall: script.getAttribute('data-call') !== 'false',
    enableSMS: script.getAttribute('data-sms') !== 'false',
    enableEmail: script.getAttribute('data-email-contact') !== 'false',
    enableBooking: script.getAttribute('data-booking') !== 'false'
  };

  const styles = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      
      #cb-widget { position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
      
      #cb-trigger { 
        width: 65px; height: 65px; border-radius: 50%; 
        background: linear-gradient(135deg, ${config.primaryColor} 0%, ${shadeColor(config.primaryColor, -20)} 100%);
        border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.3s, box-shadow 0.3s;
        animation: pulse 2s infinite;
      }
      
      #cb-trigger:hover { transform: scale(1.1); box-shadow: 0 6px 25px rgba(0,0,0,0.4); }
      #cb-trigger svg { width: 32px; height: 32px; fill: white; }
      
      @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        50% { box-shadow: 0 4px 30px rgba(102,126,234,0.6); }
      }
      
      #cb-popup {
        display: none; position: absolute; bottom: 85px; right: 0;
        width: 380px; background: white; border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        overflow: hidden; flex-direction: column;
      }
      
      #cb-popup.open { display: flex; animation: slideUp 0.3s ease; }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      #cb-header {
        background: linear-gradient(135deg, ${config.primaryColor} 0%, ${shadeColor(config.primaryColor, -20)} 100%);
        color: white; padding: 20px; position: relative;
      }
      
      #cb-close {
        position: absolute; top: 15px; right: 15px;
        background: rgba(255,255,255,0.2); border: none;
        width: 30px; height: 30px; border-radius: 50%;
        color: white; font-size: 20px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s;
      }
      
      #cb-close:hover { background: rgba(255,255,255,0.3); }
      
      #cb-title { font-size: 18px; font-weight: 600; margin-bottom: 5px; }
      #cb-subtitle { font-size: 13px; opacity: 0.9; }
      
      #cb-tabs {
        display: flex; background: #f5f5f5; border-bottom: 1px solid #e0e0e0;
      }
      
      .cb-tab {
        flex: 1; padding: 12px; text-align: center; background: none;
        border: none; cursor: pointer; font-size: 13px; color: #666;
        border-bottom: 2px solid transparent; transition: all 0.2s;
        display: flex; flex-direction: column; align-items: center; gap: 4px;
      }
      
      .cb-tab svg { width: 20px; height: 20px; fill: #666; }
      .cb-tab.active { color: ${config.primaryColor}; border-bottom-color: ${config.primaryColor}; background: white; }
      .cb-tab.active svg { fill: ${config.primaryColor}; }
      .cb-tab:hover { background: #fafafa; }
      
      #cb-content { flex: 1; padding: 20px; max-height: 400px; overflow-y: auto; }
      
      .cb-panel { display: none; }
      .cb-panel.active { display: block; }
      
      .cb-option {
        padding: 15px; background: #f8f9fa; border-radius: 10px;
        margin-bottom: 12px; cursor: pointer; transition: all 0.2s;
        display: flex; align-items: center; gap: 12px;
      }
      
      .cb-option:hover { background: #e9ecef; transform: translateX(5px); }
      .cb-option svg { width: 24px; height: 24px; fill: ${config.primaryColor}; }
      .cb-option-text { flex: 1; }
      .cb-option-title { font-weight: 600; font-size: 14px; color: #333; margin-bottom: 3px; }
      .cb-option-desc { font-size: 12px; color: #666; }
      
      #cb-chat-messages {
        min-height: 250px; max-height: 300px; overflow-y: auto;
        padding: 15px; background: #f8f9fa; border-radius: 10px;
        margin-bottom: 15px;
      }
      
      .cb-message {
        margin-bottom: 12px; padding: 10px 14px; border-radius: 18px;
        max-width: 80%; word-wrap: break-word; font-size: 14px;
        animation: messageSlide 0.3s ease;
      }
      
      @keyframes messageSlide {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .cb-message.user {
        background: ${config.primaryColor}; color: white;
        margin-left: auto; text-align: right;
        border-bottom-right-radius: 4px;
      }
      
      .cb-message.assistant {
        background: white; color: #333;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        border-bottom-left-radius: 4px;
      }
      
      .cb-typing {
        display: inline-flex; gap: 4px; padding: 10px 14px;
        background: white; border-radius: 18px; margin-bottom: 12px;
      }
      
      .cb-typing span {
        width: 8px; height: 8px; border-radius: 50%;
        background: #999; animation: typing 1.4s infinite;
      }
      
      .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
      .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
      
      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
        30% { transform: translateY(-10px); opacity: 1; }
      }
      
      #cb-input-area {
        display: flex; gap: 8px;
      }
      
      #cb-input {
        flex: 1; border: 2px solid #e0e0e0; border-radius: 25px;
        padding: 10px 16px; font-size: 14px; outline: none;
        transition: border-color 0.2s;
      }
      
      #cb-input:focus { border-color: ${config.primaryColor}; }
      
      #cb-send {
        background: ${config.primaryColor}; color: white;
        border: none; border-radius: 50%; width: 42px; height: 42px;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s; flex-shrink: 0;
      }
      
      #cb-send:hover { background: ${shadeColor(config.primaryColor, -15)}; transform: scale(1.05); }
      #cb-send svg { width: 18px; height: 18px; fill: white; }
      
      .cb-form-group {
        margin-bottom: 15px;
      }
      
      .cb-label {
        display: block; margin-bottom: 6px; font-size: 13px;
        font-weight: 600; color: #333;
      }
      
      .cb-input, .cb-textarea {
        width: 100%; padding: 10px 12px; border: 2px solid #e0e0e0;
        border-radius: 8px; font-size: 14px; font-family: inherit;
        outline: none; transition: border-color 0.2s;
      }
      
      .cb-input:focus, .cb-textarea:focus { border-color: ${config.primaryColor}; }
      .cb-textarea { resize: vertical; min-height: 80px; }
      
      .cb-button {
        width: 100%; padding: 12px; background: ${config.primaryColor};
        color: white; border: none; border-radius: 8px;
        font-size: 15px; font-weight: 600; cursor: pointer;
        transition: all 0.2s;
      }
      
      .cb-button:hover { background: ${shadeColor(config.primaryColor, -15)}; transform: translateY(-1px); }
      .cb-button:active { transform: translateY(0); }
      
      .cb-success {
        text-align: center; padding: 30px;
      }
      
      .cb-success-icon {
        width: 60px; height: 60px; background: #4caf50;
        border-radius: 50%; margin: 0 auto 15px;
        display: flex; align-items: center; justify-content: center;
      }
      
      .cb-success-icon svg { width: 30px; height: 30px; fill: white; }
      
      @media (max-width: 480px) {
        #cb-popup { width: calc(100vw - 40px); right: 20px; }
      }
    </style>
  `;

  function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
      (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
      .toString(16).slice(1);
  }

  const html = `
    ${styles}
    <div id="cb-widget">
      <button id="cb-trigger">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      </button>
      
      <div id="cb-popup">
        <div id="cb-header">
          <button id="cb-close">&times;</button>
          <div id="cb-title">Get In Touch</div>
          <div id="cb-subtitle">We're here to help!</div>
        </div>
        
        <div id="cb-tabs">
          ${config.enableChat ? '<button class="cb-tab active" data-panel="chat"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><span>Chat</span></button>' : ''}
          ${config.enableCall ? '<button class="cb-tab" data-panel="call"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg><span>Call</span></button>' : ''}
          ${config.enableEmail ? '<button class="cb-tab" data-panel="email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span>Email</span></button>' : ''}
          ${config.enableBooking ? '<button class="cb-tab" data-panel="book"><svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg><span>Book</span></button>' : ''}
        </div>
        
        <div id="cb-content">
          <div id="chat-panel" class="cb-panel active">
            <div id="cb-chat-messages">
              <div class="cb-message assistant">Hi! I'm here to help. What can I assist you with today?</div>
            </div>
            <div id="cb-input-area">
              <input type="text" id="cb-input" placeholder="Type your message..." />
              <button id="cb-send">
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
          
          <div id="call-panel" class="cb-panel">
            <div class="cb-option" onclick="window.location.href='tel:${config.phone}'">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <div class="cb-option-text">
                <div class="cb-option-title">Call Us Now</div>
                <div class="cb-option-desc">${config.phone || 'Click to call'}</div>
              </div>
            </div>
          </div>
          
          <div id="email-panel" class="cb-panel">
            <form id="cb-email-form">
              <div class="cb-form-group">
                <label class="cb-label">Your Name</label>
                <input type="text" class="cb-input" name="name" required />
              </div>
              <div class="cb-form-group">
                <label class="cb-label">Your Email</label>
                <input type="email" class="cb-input" name="email" required />
              </div>
              <div class="cb-form-group">
                <label class="cb-label">Message</label>
                <textarea class="cb-textarea" name="message" required></textarea>
              </div>
              <button type="submit" class="cb-button">Send Message</button>
            </form>
          </div>
          
          <div id="book-panel" class="cb-panel">
            <form id="cb-book-form">
              <div class="cb-form-group">
                <label class="cb-label">Your Name</label>
                <input type="text" class="cb-input" name="name" required />
              </div>
              <div class="cb-form-group">
                <label class="cb-label">Phone Number</label>
                <input type="tel" class="cb-input" name="phone" required />
              </div>
              <div class="cb-form-group">
                <label class="cb-label">Preferred Date & Time</label>
                <input type="datetime-local" class="cb-input" name="datetime" required />
              </div>
              <div class="cb-form-group">
                <label class="cb-label">Service Needed</label>
                <input type="text" class="cb-input" name="service" placeholder="e.g., AC Repair" />
              </div>
              <button type="submit" class="cb-button">Request Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  // Event handlers
  const trigger = document.getElementById('cb-trigger');
  const popup = document.getElementById('cb-popup');
  const close = document.getElementById('cb-close');
  const tabs = document.querySelectorAll('.cb-tab');
  const input = document.getElementById('cb-input');
  const send = document.getElementById('cb-send');
  const messages = document.getElementById('cb-chat-messages');

  trigger.onclick = () => popup.classList.add('open');
  close.onclick = () => popup.classList.remove('open');

  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.cb-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel + '-panel').classList.add('active');
    };
  });

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    messages.insertAdjacentHTML('beforeend', `<div class="cb-message user">${text}</div>`);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    const typing = document.createElement('div');
    typing.className = 'cb-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch(config.apiUrl + '/api/voice/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, niche: config.niche })
      });

      const data = await response.json();
      typing.remove();
      messages.insertAdjacentHTML('beforeend', `<div class="cb-message assistant">${data.reply}</div>`);
      messages.scrollTop = messages.scrollHeight;
    } catch (error) {
      typing.remove();
      messages.insertAdjacentHTML('beforeend', '<div class="cb-message assistant">Sorry, I had trouble connecting. Please try again.</div>');
      messages.scrollTop = messages.scrollHeight;
    }
  }

  send.onclick = sendMessage;
  input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };

  // Email form handler
  const emailForm = document.getElementById('cb-email-form');
  if (emailForm) {
    emailForm.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(emailForm);
      const data = Object.fromEntries(formData);
      
      // Store lead in backend
      try {
        await fetch(config.apiUrl + '/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, type: 'email', niche: config.niche })
        });
        
        document.getElementById('email-panel').innerHTML = `
          <div class="cb-success">
            <div class="cb-success-icon">
              <svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </div>
            <h3 style="margin-bottom: 10px;">Message Sent!</h3>
            <p style="color: #666;">We'll get back to you shortly.</p>
          </div>
        `;
      } catch (error) {
        alert('Failed to send message. Please try again.');
      }
    };
  }

  // Booking form handler
  const bookForm = document.getElementById('cb-book-form');
  if (bookForm) {
    bookForm.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(bookForm);
      const data = Object.fromEntries(formData);
      
      try {
        await fetch(config.apiUrl + '/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, type: 'booking', niche: config.niche })
        });
        
        document.getElementById('book-panel').innerHTML = `
          <div class="cb-success">
            <div class="cb-success-icon">
              <svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </div>
            <h3 style="margin-bottom: 10px;">Appointment Requested!</h3>
            <p style="color: #666;">We'll confirm your booking shortly.</p>
          </div>
        `;
      } catch (error) {
        alert('Failed to book appointment. Please try again.');
      }
    };
  }
})();

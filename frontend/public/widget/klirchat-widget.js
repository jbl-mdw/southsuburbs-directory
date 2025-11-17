/* KlirChat Widget - Backend Connected Version */
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  function ready(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    try {
      // Avoid double init
      if (document.getElementById("klirchat-bubble")) return;

      // ---- Find the script tag to read data-api-url ----
      var scripts = document.getElementsByTagName("script");
      var apiUrl = null;
      for (var i = scripts.length - 1; i >= 0; i--) {
        var s = scripts[i];
        if (s.src && s.src.indexOf("klirchat-widget.js") !== -1) {
          apiUrl = s.getAttribute("data-api-url") || null;
          break;
        }
      }

      // ---- Styles (scoped to kc-* only) ----
      var style = document.createElement("style");
      style.id = "klirchat-style";
      style.textContent = `
        .kc-panel, .kc-bubble {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .kc-bubble {
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 64px;
          height: 64px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 26px;
          z-index: 9999;
        }

        .kc-bubble:focus {
          outline: 2px solid #93c5fd;
          outline-offset: 2px;
        }

        .kc-panel {
          position: fixed;
          right: 24px;
          bottom: 100px;
          width: 360px;
          max-width: calc(100% - 32px);
          height: 480px;
          max-height: calc(100% - 96px);
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(15,23,42,0.35);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
        }

        .kc-panel-hidden {
          display: none;
        }

        .kc-header {
          background: #1d4ed8;
          color: #ffffff;
          padding: 12px 16px;
        }

        .kc-title {
          font-size: 15px;
          font-weight: 700;
        }

        .kc-sub {
          font-size: 12px;
          opacity: 0.9;
          margin-top: 2px;
        }

        .kc-msgs {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          background: #f1f5f9;
        }

        .kc-msg {
          margin-bottom: 8px;
          max-width: 90%;
          border-radius: 14px;
          padding: 8px 10px;
          font-size: 13px;
          line-height: 1.35;
        }

        .kc-msg-bot {
          background: #e2e8f0;
          color: #111827;
          align-self: flex-start;
        }

        .kc-msg-user {
          background: #2563eb;
          color: #ffffff;
          margin-left: auto;
          align-self: flex-end;
        }

        .kc-input-wrap {
          border-top: 1px solid #e5e7eb;
          padding: 8px;
          display: flex;
          gap: 8px;
          background: #ffffff;
        }

        .kc-input {
          flex: 1;
          border-radius: 999px;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          font-size: 13px;
        }

        .kc-input:focus {
          outline: none;
          border-color: #60a5fa;
          box-shadow: 0 0 0 1px #bfdbfe;
        }

        .kc-send {
          border-radius: 999px;
          border: none;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          background: #2563eb;
          color: #ffffff;
        }

        .kc-send:disabled {
          opacity: 0.6;
          cursor: default;
        }

        @media (max-width: 640px) {
          .kc-panel {
            right: 12px;
            bottom: 90px;
            width: calc(100% - 24px);
            height: 420px;
          }
          .kc-bubble {
            right: 16px;
            bottom: 16px;
          }
        }
      `;
      document.head.appendChild(style);

      // ---- Panel HTML ----
      var panel = document.createElement("div");
      panel.id = "klirchat-panel";
      panel.className = "kc-panel kc-panel-hidden";
      panel.innerHTML = `
        <div class="kc-header">
          <div class="kc-title">South Suburbs Best</div>
          <div class="kc-sub">Welcome! Type below...</div>
        </div>
        <div class="kc-msgs" id="kc-msgs"></div>
        <div class="kc-input-wrap">
          <input type="text" class="kc-input" id="kc-input" placeholder="Type a message..." />
          <button class="kc-send" id="kc-send">Send</button>
        </div>
      `;
      document.body.appendChild(panel);

      // ---- Bubble ----
      var bubble = document.createElement("button");
      bubble.id = "klirchat-bubble";
      bubble.className = "kc-bubble";
      bubble.setAttribute("aria-label", "Open KlirChat");
      bubble.innerHTML = "💬";
      document.body.appendChild(bubble);

      var msgs   = document.getElementById("kc-msgs");
      var input  = document.getElementById("kc-input");
      var sendBtn = document.getElementById("kc-send");

      // Conversation history to send to backend
      var conv = [
        { role: "system", content: "You are KlirChat, the assistant for South Suburbs Best." }
      ];

      function appendMessage(text, from) {
        var div = document.createElement("div");
        div.className = "kc-msg " + (from === "user" ? "kc-msg-user" : "kc-msg-bot");
        div.textContent = text;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
      }

      async function sendToBackend(userText) {
        // No backend configured: fallback stub
        if (!apiUrl) {
          appendMessage('Backend not configured yet. Stub bot: I received — "' + userText + '"', "bot");
          return;
        }

        conv.push({ role: "user", content: userText });

        try {
          sendBtn.disabled = true;
          appendMessage("Thinking...", "bot");

          var res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: conv })
          });

          if (!res.ok) {
            throw new Error("HTTP " + res.status);
          }

          var data = await res.json();
          var reply =
            (data && (data.reply || data.message)) ||
            (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
            "Sorry, I didn't get a response from the server.";

          conv.push({ role: "assistant", content: reply });
          appendMessage(reply, "bot");
        } catch (e) {
          console.error("[KlirChat] backend error:", e);
          appendMessage("Sorry, something went wrong talking to the server.", "bot");
        } finally {
          sendBtn.disabled = false;
          input.focus();
        }
      }

      function handleSend() {
        var text = (input.value || "").trim();
        if (!text) return;
        appendMessage(text, "user");
        input.value = "";
        sendToBackend(text);
      }

      sendBtn.addEventListener("click", handleSend);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });

      bubble.addEventListener("click", function () {
        panel.classList.toggle("kc-panel-hidden");
        if (!panel.classList.contains("kc-panel-hidden")) {
          input.focus();
        }
      });

      // Initial greeting
      appendMessage("Hi! I’m KlirChat. Ask me about local businesses in the South Suburbs.", "bot");
      console.log("[KlirChat] widget mounted. API URL:", apiUrl || "(none set)");
    } catch (e) {
      console.error("[KlirChat] init error:", e);
    }
  });
})();

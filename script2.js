document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("chatbot-widget");
  if (!widget) return;

  // Structure HTML du chatbot
  widget.innerHTML = `
    <div id="chatbot-container" style="
      width: 360px;
      height: 500px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      overflow: hidden;
    ">
      <div style="background:#007bff;color:white;padding:12px 16px;font-weight:bold;">
        Digital Pro Assist
      </div>
      <div id="chatbot-messages" style="
        flex:1;
        padding: 12px;
        overflow-y: auto;
        background: #f9f9f9;
      "></div>
      <div style="border-top: 1px solid #ccc;padding: 10px;">
        <input id="chat-input" type="text" placeholder="Type your message..." style="
          width: 100%;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid #ccc;
          font-size: 14px;
        " />
      </div>
    </div>
  `;

  const messages = document.getElementById("chatbot-messages");
  const input = document.getElementById("chat-input");

  function appendMessage(text, sender = "bot") {
    const bubble = document.createElement("div");
    bubble.textContent = text;
    bubble.style.padding = "10px";
    bubble.style.marginBottom = "10px";
    bubble.style.borderRadius = "12px";
    bubble.style.maxWidth = "80%";
    bubble.style.wordBreak = "break-word";
    bubble.style.background = sender === "user" ? "#007bff" : "#e0e0e0";
    bubble.style.color = sender === "user" ? "white" : "black";
    bubble.style.alignSelf = sender === "user" ? "flex-end" : "flex-start";
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  // Message d'accueil à l'ouverture
  appendMessage("Hi, I’m your assistant. How can I help you today?");

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      const userMsg = input.value.trim();
      appendMessage(userMsg, "user");
      input.value = "";

      // Simule une réponse (à remplacer avec appel fetch vers agent IA)
      setTimeout(() => {
        appendMessage("Thanks for your message. We'll get back to you shortly.");
      }, 800);
    }
  });
});
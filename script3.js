document.addEventListener("DOMContentLoaded", () => {
  // Crée le conteneur principal si nécessaire
  let container = document.getElementById("chatbot-widget");
  if (!container) {
    container = document.createElement("div");
    container.id = "chatbot-widget";
    document.body.appendChild(container);
  }

  container.style.position = "fixed";
  container.style.bottom = "100px";
  container.style.right = "20px";
  container.style.width = "360px";
  container.style.height = "500px";
  container.style.borderRadius = "16px";
  container.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
  container.style.overflow = "hidden";
  container.style.background = "#fff";
  container.style.zIndex = "9999";
  container.style.display = "none";
  container.style.flexDirection = "column";
  container.style.fontFamily = "Arial, sans-serif";

  container.innerHTML = `
    <div style="background:#007bff;color:white;padding:12px 16px;font-weight:bold;">
      Digital Pro Assist
    </div>
    <div id="chatbot-messages" style="
      flex:1;
      padding: 12px;
      height: 390px;
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

  // Message d'accueil dès ouverture
  let welcomeDisplayed = false;

  // Crée le bouton flottant
  const button = document.createElement("button");
  button.innerHTML = "💬<span id='notif-badge' style='position: absolute; top: 6px; right: 6px; background: red; color: white; font-size: 12px; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center;'>1</span>";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.borderRadius = "50%";
  button.style.backgroundColor = "#007bff";
  button.style.color = "white";
  button.style.fontSize = "28px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.zIndex = "10000";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  document.body.appendChild(button);

  button.addEventListener("click", () => {
    const isVisible = container.style.display === "block";
    container.style.display = isVisible ? "none" : "block";

    const badge = document.getElementById("notif-badge");
    if (badge) badge.style.display = "none";

    if (!isVisible && !welcomeDisplayed) {
      setTimeout(() => {
        appendMessage("Hi, I’m your assistant. How can I help you today?");
        welcomeDisplayed = true;
      }, 300);
    }
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      const userMsg = input.value.trim();
      appendMessage(userMsg, "user");
      input.value = "";

      setTimeout(() => {
        appendMessage("Thanks for your message. We'll get back to you shortly.");
      }, 800);
    }
  });
});
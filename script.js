
const chatBtn = document.getElementById("chatbot-btn");
const widget = document.getElementById("chatbot-widget");
const chatBody = document.getElementById("chat-body");
const notification = document.getElementById("notification");
let unread = true;

chatBtn.onclick = () => {
  const isOpen = widget.style.display === "flex";
  widget.style.display = isOpen ? "none" : "flex";
  if (!isOpen && unread) {
    notification.style.display = "none";
    unread = false;
  }
};

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("chat-message");
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  input.value = "";

  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  const payload = {
    email: "contact@digitalproassist.com",
    whatsapp: "+6281234567890",
    message: message
  };

  try {
    const res = await fetch("https://thyppa.app.n8n.cloud/webhook/27eaca79-d89d-4c15-95e2-f6e90bf6fa73", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    typing.remove();
    appendMessage(data.reply || "Merci pour votre message !", "bot");
  } catch (error) {
    typing.remove();
    appendMessage("Une erreur s'est produite. Veuillez réessayer plus tard.", "bot");
    console.error("Erreur lors de l'envoi:", error);
  }

  if (widget.style.display === "none") {
    notification.style.display = "flex";
    unread = true;
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const typing = document.createElement("div");
    typing.classList.add("message", "bot");
    typing.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typing.remove();
      appendMessage("Hi, I’m your assistant. How can I help you today?", "bot");
    }, 1300);
  }, 600);

  document.getElementById("chat-message").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
  });
});

document.getElementById("chat-info").onclick = () => {
  const contact = document.getElementById("contact-info");
  contact.style.display = contact.style.display === "none" ? "block" : "none";
};

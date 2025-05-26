
document.getElementById('chatbot-toggle').onclick = function () {
  const chatbot = document.getElementById('chatbot-container');
  const notification = document.getElementById('notification-bubble');
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  if (notification) notification.style.display = 'none';
};

document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const inputField = document.getElementById('chatbot-input');
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage);
    inputField.value = "";

    fetch("https://thyppa.app.n8n.cloud/webhook/27eaca79-d89d-4c15-95e2-f6e90bf6fa73", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    })
    .then(res => res.json())
    .then(data => {
      const msg = data.reply;
      if (msg.includes("[") && msg.includes("](")) {
        const parts = msg.split(/\[|\]\(|\)/);
        const formatted = '<a href="' + parts[2] + '" target="_self" style="color:#6746E1;text-decoration:underline;">' + parts[1] + '</a>';
        appendHTML("bot", formatted);
      } else {
        appendMessage("bot", msg);
      }
    });
  }
});

function appendMessage(sender, message) {
  const container = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.textContent = message;
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

function appendHTML(sender, htmlContent) {
  const container = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.innerHTML = htmlContent;
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

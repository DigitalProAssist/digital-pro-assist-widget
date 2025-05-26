// Generate or retrieve session ID from localStorage
let sessionId = localStorage.getItem('chatbot_session_id');
if (!sessionId) {
  sessionId = Date.now().toString() + '-' + Math.random().toString(36).substring(2);
  localStorage.setItem('chatbot_session_id', sessionId);
}

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
      body: JSON.stringify({ 
        message: userMessage,
        session_id: sessionId 
      })
    })
    .then(res => res.json())
    .then(data => {
      const msg = data.reply;
      const markdownToHTML = (text) => {
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_self" style="color:#6746E1;text-decoration:underline;">$1</a>');
      };
      
      appendHTML("bot", markdownToHTML(msg));
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

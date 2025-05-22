
document.getElementById('chatbot-toggle').onclick = function () {
  var chatbot = document.getElementById('chatbot-container');
  var notification = document.getElementById('notification-bubble');
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';

  // Masquer la notification une fois ouvert
  if (notification) {
    notification.style.display = 'none';
  }

  // Ajouter message de bienvenue si vide
  if (!document.getElementById('chatbot-messages').hasChildNodes()) {
    appendMessage("bot", "Hi ! How can I help you ?");
  }
};

document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const inputField = document.getElementById('chatbot-input');
    const userMessage = inputField.value;
    if (!userMessage.trim()) return;

    appendMessage("user", userMessage);
    inputField.value = "";

    fetch('https://thyppa.app.n8n.cloud/webhook/27eaca79-d89d-4c15-95e2-f6e90bf6fa73', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
      appendMessage("bot", data.reply || "Thanks for your message!");
    })
    .catch(error => {
      console.error('Erreur :', error);
      appendMessage("bot", "Something went wrong. Please try again.");
    });
  }
});

function appendMessage(sender, message) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

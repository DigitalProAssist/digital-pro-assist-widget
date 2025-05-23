
document.getElementById('chatbot-toggle').onclick = function () {
    var chatbot = document.getElementById('chatbot-container');
    var notification = document.getElementById('notification-bubble');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
    if (notification) notification.style.display = 'none';
    if (!document.getElementById('chatbot-messages').hasChildNodes()) {
        appendMessage("bot", "Hi! How can I help you?");
    }
};

document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const inputField = document.getElementById('chatbot-input');
        const userMessage = inputField.value.trim();
        if (!userMessage) return;
        appendMessage("user", userMessage);
        inputField.value = "";
        fetch('https://thyppa.app.n8n.cloud/webhook/27eaca79-d89d-4c15-95e2-f6e90bf6fa73', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("bot", data.reply || "Thanks for your message!");
        })
        .catch(() => {
            appendMessage("bot", "Something went wrong. Please try again.");
        });
    }
});

function appendMessage(sender, message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
    messageDiv.innerHTML = message;

    // Adjust links to open in the same tab for same-domain links, new tab for others
    const links = messageDiv.querySelectorAll("a");
    links.forEach(link => {
        const currentHost = window.location.hostname;
        const linkHost = new URL(link.href).hostname;
        if (linkHost === currentHost) {
            link.setAttribute("target", "_self");
        } else {
            link.setAttribute("target", "_blank");
        }
    });

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

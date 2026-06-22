document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const chatHistory = document.getElementById('chat-history');

  function addMessage(text, sender) {
    if (!text.trim()) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (sender === 'user') {
      messageDiv.classList.add('user-message');
    } else {
      messageDiv.classList.add('system-message');
    }

    messageDiv.textContent = text;
    chatHistory.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function handleSend() {
    const text = userInput.value;
    if (text.trim()) {
      addMessage(text, 'user');
      userInput.value = '';
      
      // Placeholder for your future AI API call
      setTimeout(() => {
        addMessage("I'm a local UI right now! Connect me to an LLM API to make me smart.", 'system');
      }, 600);
    }
  }

  sendBtn.addEventListener('click', handleSend);

  // Allow sending with the Enter key
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });
});
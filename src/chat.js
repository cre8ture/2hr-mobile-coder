window.onload = function() {
    document.getElementById('send-button').addEventListener('click', function() {
        var chatInput = document.getElementById('chat-input');
        var chatArea = document.getElementById('chat-area');


        // Append the user's message to the chat area
        var userMessage = document.createElement('p');
        userMessage.textContent = 'User: ' + chatInput.value;
        chatArea.appendChild(userMessage);
        console.log("user: " + chatInput.value);

        // Clear the chat input
        chatInput.value = '';

        // Append the AI's response to the chat area
        var aiResponse = document.createElement('p');
        aiResponse.textContent = 'AI: Connect me to an LLM and I will respond...';
        chatArea.appendChild(aiResponse);
    });
}
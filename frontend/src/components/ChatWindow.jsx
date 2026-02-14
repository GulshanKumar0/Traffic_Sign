const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
          <p>{message.text}</p>
          <time>{new Date(message.timestamp).toLocaleTimeString()}</time>
        </div>
      ))}
      {loading && <div className="typing">AI is typing...</div>}
    </div>
  );
};

export default ChatWindow;

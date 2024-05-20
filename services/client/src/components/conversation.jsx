import React, { useState } from "react";

const ConversationBox = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "John" },
    { id: 2, text: "Hi there!", sender: "Jane" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "Me", // Assuming the user is sending the message
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex-1 bg-white h-screen p-4 border border-gray-300 rounded-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <span className="text-lg font-semibold">
                <span className="text-indigo-600">{user?.name}</span>
              </span>
              <p className="text-gray-500 text-sm">Online</p>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.sender === "Me" ? "text-right" : "text-left"
              } mb-2`}
            >
              <span
                className={`inline-block bg-gray-200 rounded-lg px-4 py-2 ${
                  message.sender === "Me" ? "bg-blue-200" : "bg-gray-300"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex border border-gray-300 rounded-lg">
          <input
            type="text"
            className="flex-1 border-none px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleMessageChange}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;

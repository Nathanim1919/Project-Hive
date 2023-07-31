import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/chat/chatting.css";

export default function Chatting({ project }) {
  const [content, setContent] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [messageSend, setMessageSend] = useState(false);

  const { id, projectId } = useParams();
  const { chatboard } = project;

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}/chatboard/${chatboard}/getMessages`
        );
        const messages = response.data.messages; // Assuming the messages are returned as an array
        console.log(messages);
        setChatHistory(messages); // Update the state with the fetched messages
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [projectId, messageSend]); // Add 'projectId' as a dependency to re-fetch when 'projectId' changes

  const sendMessage = async () => {
    try {
      const sendmessage = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/chatboard/${chatboard}/createMessage`,{
        content,id,projectId} // Send the wrapped 'content' in the request body
      );
    } catch (error) {
      console.error(error);
    }
    setMessageSend(!messageSend);
    setContent('');
  };

  return (
    <div className="chatContainer">
      <div style={{ height: "430px", overflowY: "scroll" }}>
        {chatHistory.map((msg, index) => (
          <div
            className={
              msg.sender && msg.sender._id === id
                ? "message activeUser-msg"
                : "message not-activeUser-msg"
            }
            key={index}
          >
            <p className="msg-content">{msg.content}</p>
            <p className="sender">{msg.sender && msg.sender.name}</p>
          </div>
        ))}
      </div>
      <div className="messageBox">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const Home = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connected", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);

  console.log(messages);
  console.log(message);

  socket.on("messageReturn", (message) => {
    console.log("message");
    setMessages([...messages, message]);
  });

  const handleClick = () => {
    socket.emit("message", message);
    setMessage("");
    setMessages([...messages, message]);
  };

  return (
    <div className="text-center">
      <h1>Messages</h1>
      <div className="h-80 border w-1/2 mx-auto my-4 border-slate-500 rounded-md">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        className="border me-4 py-2 w-1/3 outline-none ps-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="border px-4 py-2 bg-blue-400 rounded-xl text-white"
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
};

export default Home;

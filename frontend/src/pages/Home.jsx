import { useEffect, useState } from "react";
import API from "../api/axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const openConversation = async (user) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/conversation",
        {
          receiverId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConversation(res.data);
      setSelectedUser(user);

      const messageRes = await API.get(
        `/messages/${res.data._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(messageRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !conversation) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/messages",
        {
          conversationId: conversation._id,
          receiverId: selectedUser._id,
          content: messageText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setMessageText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-slate-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">
          Live Chat
        </h2>

        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => openConversation(user)}
            className="bg-slate-700 p-3 rounded mb-2 cursor-pointer hover:bg-slate-600"
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow p-4 font-semibold">
          {selectedUser
            ? `Chat with ${selectedUser.name}`
            : "Select a User"}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 bg-slate-100 overflow-y-auto">
          {messages.map((msg) => {
            const isMine =
              msg.sender?._id === currentUser?._id ||
              msg.sender === currentUser?._id;

            return (
              <div
                key={msg._id}
                className={`mb-2 flex ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded max-w-xs ${
                    isMine
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="w-full border p-3 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
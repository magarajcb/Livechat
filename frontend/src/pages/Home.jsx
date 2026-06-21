import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [typing, setTyping] = useState(false);
const [onlineUsers, setOnlineUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

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
useEffect(() => {
  console.log("Current User:", currentUser);

  if (!currentUser?._id) {
    console.log("No user id found");
    return;
  }

  socketRef.current = io("https://livechat-1-kbl3.onrender.com");

  socketRef.current.on("connect", () => {
    console.log("Socket Connected:", socketRef.current.id);

    socketRef.current.emit("join", currentUser._id);
  });

 socketRef.current.on("newMessage", (message) => {
  console.log("Message Received:", message);

  setMessages((prev) => [...prev, message]);
});

socketRef.current.on("userTyping", () => {
  console.log("USER TYPING RECEIVED");

  setTyping(true);

  setTimeout(() => {
    setTyping(false);
  }, 1500);
});
socketRef.current.on("onlineUsers", (users) => {
  console.log("ONLINE USERS:", users);
  setOnlineUsers(users);
});
  return () => {
    socketRef.current?.disconnect();
  };
}, [currentUser]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  socketRef.current?.disconnect();

  navigate("/login");
};


  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-slate-900 text-white flex flex-col">
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-2xl font-bold">
            Live Chat
          </h2>
          <p className="text-sm text-slate-400">
            Welcome {currentUser?.name}
          </p>
           <button
    onClick={handleLogout}
    className="mt-3 bg-red-500 px-3 py-2 rounded-lg text-sm hover:bg-red-600"
  >
    Logout
  </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {users
            .filter(
              (user) => user._id !== currentUser?._id
            )
            .map((user) => (
              <div
                key={user._id}
                onClick={() => openConversation(user)}
                className={`p-3 rounded-xl mb-2 cursor-pointer transition ${
                  selectedUser?._id === user._id
                    ? "bg-blue-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
               <div className="flex justify-between items-center">
  <span>{user.name}</span>

  <span>
    {onlineUsers.includes(user._id)
      ? "🟢"
      : "⚫"}
  </span>
</div>

                <div className="text-xs text-slate-300">
                  Click to chat
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm border-b">
          {selectedUser ? (
            <div>
              <h3 className="font-semibold text-lg">
                {selectedUser.name}
              </h3>
            <p
  className={`text-sm ${
    onlineUsers.includes(selectedUser?._id)
      ? "text-green-600"
      : "text-gray-500"
  }`}
>
  {onlineUsers.includes(selectedUser?._id)
    ? "🟢 Online"
    : "⚫ Offline"}
</p>
            </div>
          ) : (
            <h3 className="font-semibold">
              Select a User
            </h3>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-100">
          {messages.map((msg) => {
            const isMine =
              msg.sender?._id === currentUser?._id ||
              msg.sender === currentUser?._id;

            return (
              <div
                key={msg._id}
                className={`flex mb-3 ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 max-w-sm shadow rounded-2xl ${
                    isMine
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-black rounded-bl-md"
                  }`}
                >
                  <p>{msg.content}</p>

                  <p className="text-[10px] mt-1 text-right opacity-70">
                    {msg.createdAt
                      ? new Date(
                          msg.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            // onChange={(e) =>
            //   setMessageText(e.target.value)
            
            // }
            onChange={(e) => {
  setMessageText(e.target.value);

  if (selectedUser) {
    socketRef.current.emit(
      "typing",
      {
        receiverId:
          selectedUser._id,
      }
    );
  }
}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 border rounded-xl p-3 focus:outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 rounded-xl hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
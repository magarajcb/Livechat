const Home = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-slate-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">
          Live Chat
        </h2>

        <div className="bg-slate-700 p-3 rounded mb-2 cursor-pointer">
          User 1
        </div>

        <div className="bg-slate-700 p-3 rounded mb-2 cursor-pointer">
          User 2
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow p-4 font-semibold">
          Select a User
        </div>

        <div className="flex-1 p-4 bg-slate-100">
          Messages will appear here
        </div>

        <div className="p-4 bg-white border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border p-3 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
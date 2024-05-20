import React, { useEffect } from "react";

// Dummy user data
const dummyUsers = [
  { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Bob Brown", avatar: "https://i.pravatar.cc/150?img=4" },
];

const SidePanel = ({ setUser }) => {
  useEffect(() => {
    setUser(dummyUsers[0]);
  }, []);
  return (
    <div className="bg-gray-100 w-64 h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <ul>
        {dummyUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center py-2 cursor-pointer"
            onClick={() => setUser(user)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanel;

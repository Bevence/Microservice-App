import { useState } from "react";
import "./App.css";
import Login from "./components/login";
import ConversationBox from "./components/conversation";
import SidePanel from "./components/sidePanel";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex">
          <SidePanel setUser={setUser} />
          <ConversationBox user={user} />
        </div>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;

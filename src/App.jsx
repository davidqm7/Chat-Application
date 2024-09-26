import React from "react";
import { auth } from './firebase';  
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './Components/ChatRoom'
import Auth from './Components/Auth'; // Now we are importing Auth again
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
        <div className="user-info">
          {user ? (
            <>
              <img src={user.photoURL} alt={user.displayName} />
              <span>{user.displayName}</span>
              <button onClick={() => auth.signOut()}>Sign Out</button>
            </>
          ) : (
            <Auth />  // Auth component handles signing in
          )}
        </div>
      </header>
      <section>
        {user ? <ChatRoom /> : <p>Please sign in to chat.</p>}
      </section>
    </div>
  );
}

export default App;

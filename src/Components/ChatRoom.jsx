import React, { useState, useEffect, useRef } from "react"; // useRef creates a reference to an HTML element (used for scrolling later).
import { collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore"; // Firestore functions for real-time data.
import { db } from "../firebase";  // Import Firestore database instance.
import { useAuthState } from "react-firebase-hooks/auth";  // Hook to track the current authenticated user.
import { auth } from "../firebase";  // Import Firebase auth.
import Picker from 'emoji-picker-react';   // Import emoji picker for emoji support.

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);  // State to store chat messages retrieved from Firestore.
  const [newMessage, setNewMessage] = useState("");  // State to store the content of the new message being typed.
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);  // State to control the visibility of the emoji picker.
  const dummy = useRef();    // A reference to an empty div used for scrolling to the latest message.
  const [user] = useAuthState(auth);  // Retrieves the currently logged-in user from Firebase Authentication.

  useEffect(() => {   // useEffect runs when the component mounts and subscribes to Firestore changes.
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));   // Query to fetch the "messages" collection, ordered by creation time and limited to the latest 50 messages.
    const unsubscribe = onSnapshot(q, (snapshot) => {     // Set up a real-time listener for Firestore data.
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));   // Update the state with the new messages from the Firestore snapshot.
    });
    return unsubscribe;     // Cleanup function to unsubscribe from the listener when the component unmounts to avoid memory leaks.
  }, []); 

  const sendMessage = async (e) => {    // Function to handle sending a new message.
    e.preventDefault();    // Prevents page reload on form submission.
    if (newMessage.trim()) {     // Ensure the message is not empty or just whitespace.
      await addDoc(collection(db, "messages"), {     // Add a new message document to the "messages" collection in Firestore.
        text: newMessage, 
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      setNewMessage("");     // Reset the input field after the message is sent.
      dummy.current.scrollIntoView({ behavior: "smooth" });    // Scroll to the bottom of the chat (to the dummy div) to show the latest message.
    }
  };

  const onEmojiClick = (emojiObject) => {  // Function to handle emoji selection.
    setNewMessage(newMessage + emojiObject.emoji);     // Append the selected emoji to the current message in the input field.
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map(msg => <Message key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage}>
        <input 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😊
        </button>
        {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const Message = ({ message }) => {    // Component for rendering individual messages.
  const { text, displayName, photoURL } = message;   // Destructure the message object to get the text, displayName, and photoURL.

  return (
    <div className="message">
      <img src={photoURL} alt={displayName} />
      <p>{text}</p>
    </div>
  );
};

export default ChatRoom;

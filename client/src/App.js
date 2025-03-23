import './App.css';
import React, { useEffect, useState } from 'react';
import Login from "./components/Login"
import Chatting from "./components/Chatting"

function App() {

    const [userName, setUserName] = useState("");



  return (
   <div className="main" id='wrapper'>{userName ?( <Chatting userName ={userName} />) : (<Login setUserName={setUserName} />)}</div>
  );
}

export default App;

import React from 'react';
import './App.css';
import {useState} from 'react';

const App = () => {
  const [msg, setMsg] = useState('');

  const handleClick = async () => {
    const data = await fetch('/api/test');
    const json = await data.json();
    const msg = json.msg;

    setMsg(msg);
  }

  
  return (
    <div className="App"> 
      <button onClick={handleClick}>
        Hello World !
      </button>
      <p>{msg}</p>
    </div>
  );
}

export default App;

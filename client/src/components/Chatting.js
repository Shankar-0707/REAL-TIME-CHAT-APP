import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./Chatting.css";


const client = new W3CWebSocket("ws://localhost:8000");





const Chatting = ({ userName }) => {
    const [myMessage, setMyMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const onSend = () => {
        if (client.readyState !== 1) {
            console.log("❌ WebSocket is not connected yet!");
            return;
        }
        client.send(
            JSON.stringify({
                type: "message",
                message: myMessage,
                userName,
            })
        );
        
        setMyMessage("");
    };

    useEffect(() => {

        client.onopen = () => {
            console.log("✅ WebSocket Client Connected");
        };
        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setMessages((messages) => [
                ...messages,
                {
                    message : data.message,
                    userName : data.userName,
                },
            ]);
        };},
     []);

    return (
        <>
            <div className="title"> Socket Chat : {userName}</div>

            {messages.map((message,key) => (
               <div
               className={`message ${
                   message.userName === userName ? "sent" : "received"
               }`}
               key={key}
           >
                    <section>{message.userName[0].toUpperCase()}</section>
                    <h4>{message.userName + ":"}</h4>
                    <p>{message.message}</p>
                </div>
            ))}

            <div className="bottom form">
                <input
                    type="text"
                    value={myMessage}
                    onChange={(e) => setMyMessage(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && onSend()}
                    placeholder="Message"
                />

                <button onClick={onSend}>Send</button>
            </div>
        </>
    );
};

export default Chatting;

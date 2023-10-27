import { useEffect, useState } from "react";
import "./Chat.css";
import Avatar from "../../pages/avatar/Avatar";
import ChatMessage from "../../pages/chatMessages/ChatMessage";
import axios from "../../axios.js";

const Chat = ({ messages, rid }) => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const currentdate = new Date();
  const datetime = currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

  const sendMessage =async (e) => {
    e.preventDefault();

    await axios.post(`/messages/new/${rid}`, {
      message: input,
      name: "Abhishek",
      timeStamp: datetime,
      received: false
    });

    setInput("");
  };

  // const getRoomData =async ()=>{
  //   const data = await axios.get(`/room/${rid}`);
  //   return data
  // }
  useEffect(()=>{
    axios.get(`/room/${rid}`).then((res)=>{
      setName(res?.data?.room?.name);
    })
    // eslint-disable-next-line
  },[rid]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://lh3.googleusercontent.com/a/AAcHTtePAXLDxYB9LGl358vFfesxJncBxykj5sVkjO5IIr3Z7ms=s360-c-no" />

        <div className="chat__headerInfo">
          <h3>{name}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <i className="fa-solid fa-magnifying-glass"></i>
          <img
            src="./attach.png"
            alt="attach.png"
            style={{ width: "20px", height: "20px" }}
          />
          <img
            src="./3dot.png"
            alt="donut.png"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>

      <div className="chat__body">
        {messages?.map((msg) => {
          return (
            <div key={msg._id}>
              <ChatMessage msg={msg} />
            </div>
          );
        })}

        <img
          src="./tree.png"
          style={{
            position: "absolute",
            right: "100px",
            width: "100px",
            height: "200px",
            bottom: "66px",
            opacity: "0.6",
          }}
        />
        <img
          src="./tree.png"
          style={{
            position: "absolute",
            left: "450px",
            width: "100px",
            height: "200px",
            bottom: "66px",
            opacity: "0.55",
          }}
        />
      </div>

      <div className="chat__footer">
        <i className="fa-regular fa-face-smile footer__icon"></i>
        <form>
          <input
            type="text"
            name="input"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <img
          className="footer__icon"
          src="microphone.png"
          style={{ width: "20px" }}
        />
      </div>
    </div>
  );
};

export default Chat;

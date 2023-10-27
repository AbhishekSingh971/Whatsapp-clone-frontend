import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [msg, setMsg] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [RID, setRID] = useState("");

  useEffect(() => {
    axios.get(`/messages/sync/${RID}`).then((res) => {
      setMsg(res.data.messages);
    });
    console.log(RID)
  }, [RID]);
  useEffect(() => {
    axios.get("/rooms/sync").then((res) => {
      setRooms(res.data.rooms);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("4a5d92b115d680c9c8ff", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMsg([...msg, newMessage]);
    });
    const channelR = pusher.subscribe("rooms");
    channelR.bind("inserted", (newRooms) => {
      // alert(JSON.stringify(newMessage));
      setRooms([...rooms, newRooms]);
    });

    return () => {
      channel.unbind_all();
      channelR.unbind_all();
      channel.unsubscribe();
      channelR.unsubscribe();
    };
  }, [msg, rooms]);

  // console.log(msg, rooms);
  return (
    <div className="app">
      <span className="Whatsapp_span">
        <img className="Whatsapp_icon" src="./icon.png" alt="img.png" />
        WhatsApp
      </span>

      <div className="app_body">
        <Sidebar rooms={rooms} setRID={setRID} />
        {RID? (<Chat messages={msg} rid={RID} />): (<h1 className="chat__textCenter">Select the chat Room</h1>)}
      </div>
    </div>
  );
}

export default App;

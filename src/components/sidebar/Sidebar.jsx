import "react";
import "./Sidebar.css";
import Avatar from "../../pages/avatar/Avatar";
import SidebarChat from "../../pages/SidebarChat/SidebarChat";
import axios from "../../axios.js";
import { useState } from "react";

const Sidebar = ({rooms, setRID}) => {
  const [input, setInput] = useState("");

  const sendRooms =async (e) => {
    e.preventDefault();

    await axios.post("/rooms/new", {
      name: input
    });

    setInput("");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://lh3.googleusercontent.com/a/AAcHTtePAXLDxYB9LGl358vFfesxJncBxykj5sVkjO5IIr3Z7ms=s360-c-no" />
        <div className="sidebar__headerRight">
          <img
            src="./donut.png"
            alt="donut.png"
            style={{ width: "20px", height: "20px" }}
          />
          <img
            src="./chat.jpg"
            alt="donut.png"
            style={{ width: "40px", height: "25px" }}
          />
          <img
            src="./3dot.png"
            alt="donut.png"
            style={{ width: "20px", height: "20px" }}
          />
        </div>

      </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Search or start new chat" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          </div>
        </div>

        <div className="sidebar__chats">
          {rooms?.map((room)=>(
            <SidebarChat key={room._id} room={room} setRID={setRID}/>
          ))}
        </div>
        {
          input &&
        <button onClick={sendRooms} type='submit'>Add User</button>
        }
    </div>
  );
};

export default Sidebar;

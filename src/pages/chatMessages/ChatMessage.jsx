import { useRef, useState } from 'react';
import './ChatMessage.css'
import axios from '../../axios.js';

const ChatMessage = (props) => {
  const {msg} = props;
  const {name, message, timeStamp, received} = msg;
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const divElement = divRef.current;
    if (divElement) {
      // divElement.style.display = divElement.style.display === 'none' ? 'flex' : 'none';
      divElement.classList.add(isVisible===false?"visible":"hidden");
      divElement.classList.remove(isVisible===false?"hidden":"visible");
      setIsVisible(!isVisible);
    }
  };

  const deleteChat = (id)=>{
    axios.delete(`/messages/delete/${id}`);
  }
  return (
    <div className='chatMessageDiv'>
        <p className={`chat__message  ${!received ? "chat__reciever":""}`} onClick={toggleVisibility}>
          <span className="chat__name">{name}</span>
          {message}
          <span className="chat__timestamp">
            {timeStamp}
            {/* {new Date().toUTCString()} */}
            {/* message.timestamp?.toDate() */}
          </span>
        </p>
         <div ref={divRef} className='hidden'>
          <div>
          <span onClick={()=>deleteChat(msg._id)}>Delete</span>
          <span>Edit</span>
          <span>Replay</span>
          </div>
        </div>

    </div>
  )
}

export default ChatMessage
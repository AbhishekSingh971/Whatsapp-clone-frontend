import 'react'
import './SidebarChat.css'
import Avatar from '../avatar/Avatar'

const SidebarChat = ({room, setRID}) => {
  const {name} = room;
  return (
    <div className='sidebarChat' onClick={()=>setRID(room._id)}>
        <Avatar src='https://lh3.googleusercontent.com/a/AAcHTtePAXLDxYB9LGl358vFfesxJncBxykj5sVkjO5IIr3Z7ms=s360-c-no'/>
        <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
}

export default SidebarChat
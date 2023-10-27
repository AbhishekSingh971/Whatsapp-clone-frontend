import 'react'
import "./Avatar.css"

const Avatar = ({src}) => {
  return (
    <img className='avatar' src={src}></img>
  )
}

export default Avatar
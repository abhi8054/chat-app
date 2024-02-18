import React from 'react'
import styles from "./MessageContainer.module.css"
import { useSelector } from 'react-redux'
import { useAuthContext } from '../../context/authContext'
import { extractTime } from '../../utils'

const Message = ({message}) => {
  
  const {user} = useAuthContext() 

  const forme = user?.id === message?.sender_id
  console.log(user);
  const time =  extractTime(message.createdAt)

  return (
    <div className="chat">
        <div data-time={time} className={`msg ${forme ? "sent" : "rcvd"}`}>{message.message}</div>
    </div>
  )
}

export default Message
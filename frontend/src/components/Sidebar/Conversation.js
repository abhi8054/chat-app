import React, { useEffect } from 'react'
import styles from "./Sidebar.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, resetConversation, resetMessages } from '../../redux/slice/conversationSlice'

const Conversation = ({profile,name,conversation}) => {

    const dispatch = useDispatch()
    const {selectedConversation} = useSelector(data => data.conversation)
    const selected = selectedConversation?._id === conversation?._id
    
    const onSelectHandler = () => {
        dispatch(addConversation(conversation))
    }

    useEffect(() => {
        return () => {
            dispatch(resetConversation())
            dispatch(resetMessages())
        }
    },[])

  return (
    <div onClick={onSelectHandler} className={`${styles.tile} ${selected ? styles.activeTile : ""}`}>
        <div className={styles.left}>
            <div className={`${styles.avatar} ${styles.online}`}>
                <img src={profile} alt='profile'/>
                <span></span>
            </div>
            <p className={styles.name}>
                {name}
            </p>
        </div>
        <div className={styles.right}>
            <span>🏀</span>
        </div>
    </div>
  )
}

export default Conversation
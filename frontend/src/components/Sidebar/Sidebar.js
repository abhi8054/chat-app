import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import styles from "./Sidebar.module.css"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <SearchInput />
        <hr></hr>
        <Conversations />
        <hr></hr>
        <LogoutButton />
    </div>
  )
}

export default Sidebar
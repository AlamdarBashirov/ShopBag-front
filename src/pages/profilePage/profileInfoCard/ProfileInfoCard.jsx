import React from 'react'
import style from './ProfileInfoCard.module.scss'

const ProfileInfoCard = ({ item, logOut, deleteAccount }) => {
  return (
    <div className={style.card}>
      <div className={style.nameBox}>
        <h2>First Name: {item.firstname}</h2>
        <h2>Last Name: {item.lastname}</h2>
      </div>
      <div className={style.contactBox}>
        <h2>email: {item.email}</h2>
        <h2>phone: {item.phone}</h2>
      </div>
      <div className={style.buttons}>
        <div className={style.logOutButton}>
          <button onClick={logOut}>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoCard
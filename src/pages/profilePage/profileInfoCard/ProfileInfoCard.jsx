import React from 'react'
import style from './ProfileInfoCard.module.scss'

const ProfileInfoCard = ({item, logOut, deleteAccount}) => {
  return (
    <div className={style.card}>
        <div className={style.nameBox}>
            <h4>{item.firstname}</h4>
            <h4>{item.lastname}</h4>
        </div>
        <p>email: {item.email}</p>

        <div className={style.logOutButton}>
            <button onClick={logOut}>Log Out</button>
        </div>
        <div className={style.deleteAccount}>
            <button onClick={deleteAccount}>delete account</button>
        </div>
    </div>
  )
}

export default ProfileInfoCard
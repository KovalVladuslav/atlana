import React from 'react'
import { IUser } from '../interfaces'
import styles from './FullUserInfo.module.scss'
import moment from 'moment';

interface IFullUserInfoProps {
    dataUser: IUser
}

const getDate = (createdAt:string) => moment.utc(createdAt, "YYYY-MM-DD HH").local().format('DD-MM-YYYY');

const FullUserInfo: React.FC<IFullUserInfoProps> = ({ dataUser}) => {
    const { name, email, location, created_at, followers, following, bio } = dataUser

    const createdDate = getDate(created_at)

    return (
        <div className={styles.userDashboard}>
            <div className={styles.userDashboard_top}>
                <img src={dataUser.avatar_url} alt='user avatar'/>
                <div className={styles.userDashboard_info}>
                    <p>Name: {name}</p>
                    {!!email && <p>Email: {email}</p> }
                    {location && <p>Location: {location}</p>}
                    <p>Join data: {createdDate}</p>
                    <p>Followers: {followers}</p>
                    <p>Following: {following}</p>
                </div>
            </div>
            {!!bio &&
            <div className={styles.userDashboard_bio}>
                <p>Bio: {bio}</p>
            </div>}
        </div>
    )
}

export default FullUserInfo

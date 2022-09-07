import React from 'react'
import styles from './UserCard.module.scss'
import { useNavigate } from 'react-router-dom'

interface IUserCardProps {
    imageUrl: string,
    name: string,
    reposCount: number,
    id: number
}

const UserCard:React.FC<IUserCardProps> = ({ imageUrl, name, reposCount, id }) => {
    const navigate = useNavigate()

    const onClickCard = ():void => navigate(id.toString())

    return (
        <div className={styles.userCard} onClick={onClickCard}>
            <img src={imageUrl} alt='user' className={styles.userCard_img}/>
            <p>{name}</p>
            <div className={styles.userCard_repoContainer}>
                <span>Repos: </span>
                <span>{reposCount}</span>
            </div>
        </div>
    )
};

export default UserCard

import React from 'react'
import styles from './RepoCard.module.scss'

interface IRepoCardProps {
    forksCount: number,
    name: string,
    stargazersCount: number
}

const RepoCard:React.FC<IRepoCardProps> = ({ name, forksCount, stargazersCount}) => {
    return (
        <div className={styles.repoCard}>
            <p>{name}</p>
            <div className={styles.repoCard_counter}>
                <span>{forksCount} - Fork</span>
                <span>{stargazersCount} - Stars</span>
            </div>
        </div>
    )
}

export default RepoCard

import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { useParams } from 'react-router-dom'
import { IRepo, IUser } from '../interfaces'
import useDebounce from '../hooks/useDebounce'
import UsersServices from '../services/users.services'
import FullUserInfo from '../components/FullUserInfo'
import RepoCard from '../components/RepoCard'

type MyParams = {
    userId: string;
};

const CurrentUser:React.FC = () => {
    const [value, setValue] = useState('')
    const [user, setUser] = useState<IUser>({} as IUser)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [repos, setRepos] = useState<IRepo[]>([])

    const { userId } = useParams<keyof MyParams>() as MyParams;

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const debounceSearchRepo = useDebounce(value, 1000);

    useEffect(() => {
        setIsLoading(true)

        UsersServices.getUser(userId)
            .then(res => setUser(res.data))
            .catch(() => setError('Something was wrong'))
            .finally(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        if (!debounceSearchRepo) {
            UsersServices.getReposUser(debounceSearchRepo, user.login)
                .then(res => setRepos(res.data)).catch(() => setError('Something went wrong while loading the repos'))
        } else {
            UsersServices.getSearchedReposUser(debounceSearchRepo, user.login)
                .then(res => setRepos(res.data.items)).catch(() => setError('Something went wrong while loading the searched repos'))
        }
    }, [debounceSearchRepo, user])

    return (
        <>
            {!!error && <p className='errorMessage'>{error}</p>}

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <FullUserInfo dataUser={user}/>

                    <SearchInput
                        placeholder='Search for User`s Repositories'
                        value={value}
                        onChange={handleSearchInput}
                    />

                    {!repos.length && debounceSearchRepo && <p>Empty data</p>}

                    {repos.map(({ id,  name, forks_count, stargazers_count }) => (
                        <RepoCard
                            key={id}
                            name={name}
                            forksCount={forks_count}
                            stargazersCount={stargazers_count}
                        />
                    ))}
                </>
            )}

        </>
    )
};

export default CurrentUser

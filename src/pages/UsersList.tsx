import React, { useContext } from 'react'
import SearchInput from '../components/SearchInput'
import UserCard from '../components/UserCard'
import { AppContext } from '../App'

const UsersList: React.FC = () => {
    const {
        users,
        isLoadingUsers,
        error,
        searchValue,
        setSearchValue
    } = useContext(AppContext)

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    return (
        <>
            <SearchInput
                placeholder='Search for Users'
                value={searchValue}
                onChange={handleSearchInput}
            />

            {!!error && <p className='errorMessage'>{error}</p>}

            {isLoadingUsers ? (
                <p>Loading...</p>
            ) : (
                users.map(({ id, avatar_url, name, public_repos }) => (
                    <UserCard
                        key={id}
                        imageUrl={avatar_url}
                        name={name}
                        reposCount={public_repos}
                        id={id}
                    />
                ))
            )}

            {!users.length && searchValue && <p>Empty data</p>}
        </>
    )
}

export default UsersList

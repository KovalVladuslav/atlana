import React, { createContext, useEffect, useState } from 'react'
import './index.scss'
import { Route, Routes, Navigate } from 'react-router-dom'
import UsersList from './pages/UsersList'
import CurrentUser from './pages/CurrentUser'
import UsersServices from './services/users.services'
import { IUser, IUsersContext } from './interfaces'
import useDebounce from './hooks/useDebounce'

export const AppContext = createContext<IUsersContext>({} as IUsersContext)

const App: React.FC = () => {
    const [users, setUsers] = useState<Array<IUser>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const debounceSearch = useDebounce(searchValue, 1000);

    useEffect(() => {
        if (!debounceSearch) {
            setIsLoading(true)

            UsersServices.getFullUsers()
                .then(res => {
                    const dataUsers = res.map(({ data }) => data)

                    setUsers(dataUsers)
                })
                .catch(() => setError('Something was wrong'))
                .finally(() => setIsLoading(false))
        } else {
            setIsLoading(true)

            UsersServices.getSearchedUsers(debounceSearch)
                .then(res => {

                    const dataUsers = res.map(({ data }) => data)

                    setUsers(dataUsers)
                })
                .catch(() => setError('Something was wrong'))
                .finally(() => setIsLoading(false))
        }

    }, [debounceSearch])

    return (
        <AppContext.Provider value={{
            users,
            isLoadingUsers: isLoading,
            error,
            searchValue,
            setSearchValue
        }}>
            <div className='main_container'>
                <h1 className='main_title'>GitHub searcher</h1>

                <Routes>
                    <Route path="/atlana" element={<UsersList/>}/>
                    <Route path="/atlana/:userId" element={<CurrentUser/>}/>

                    <Route path='/' element={ <Navigate replace to='/atlana'/> }/>
                </Routes>
            </div>
        </AppContext.Provider>
    )
}

export default App

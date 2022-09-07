import axios from 'axios'
import { IUser } from '../interfaces'

interface ISearchedUsers {
    items: IUser[]
}

class UsersServices {
    static getUser(id:number | string) {
        return axios.get(`https://api.github.com/user/${id}`)
    }

    static async getFullUsers() {
        const responseUsers = await axios.get<IUser[]>('https://api.github.com/users?per_page=10')

        const processedUsers = responseUsers.data.map(user => {
            return this.getUser(user.id)
        })

        return await Promise.all(processedUsers)
    }

    static async getSearchedUsers(query:string) {
        const queryString = 'q=' + encodeURIComponent(`${query} in:name`);

        const responseSearchedUsers = await axios.get<ISearchedUsers>(`https://api.github.com/search/users?${queryString}&per_page=10`)

        const processedSearchedUsers = responseSearchedUsers.data.items.map(user => {
            return this.getUser(user.id)
        })

        return await Promise.all(processedSearchedUsers)
    }

    static getReposUser(query:string, login:string) {
        return axios.get(`https://api.github.com/users/${login}/repos?per_page=10`)
    }

    static getSearchedReposUser(query:string, login:string) {
        const queryString = 'q=' + encodeURIComponent(`${query} in:name user:${login}`);

        return axios.get(`https://api.github.com/search/repositories?${queryString}&per_page=10`)
    }
}

export default UsersServices

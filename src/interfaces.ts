export interface IUser {
    name: string,
    id: number,
    avatar_url: string,
    public_repos: number,
    email: string | null,
    location: string | null,
    created_at: string,
    followers: number,
    following: number,
    bio: string | null,
    login: string,
}

export interface IRepo {
    name: string,
    forks_count: number,
    stargazers_count: number,
    id: number,
}

export interface IUsersContext {
    users: IUser[],
    isLoadingUsers: boolean,
    error: string,
    setSearchValue: (value: string) => void,
    searchValue: string,
}

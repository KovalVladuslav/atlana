import React from 'react'
import styles from './SearchInput.module.scss'

interface ISearchInputProps {
    placeholder: string,
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput:React.FC<ISearchInputProps> = ({ placeholder, value, onChange }) => {
    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.searchInput}
        />
    )
}

export default SearchInput

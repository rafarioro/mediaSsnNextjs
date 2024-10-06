'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './cStyle.css'
import { VscSearch } from "react-icons/vsc";


export default function Search() { 

    const router = useRouter()
    const [ isFocused, setIsFocused ] = useState(false);
    const [idItem, setIdItem] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 

        if(idItem === '') return

        //navigate to the [id] route with the idItem as the param
        router.push(`/${idItem}`)

    }

    return (
        <form 
            className={`form-container ${isFocused ? 'focused' : ''}`}
            onSubmit={handleSubmit}>
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="text"
                placeholder="Enter an id to verify"
                value={idItem}
                onChange={(e) => setIdItem(e.target.value)}
            />
            <button  
                type="submit" 
                >
                <VscSearch />
                Search
            </button>
        </form>
    )
}
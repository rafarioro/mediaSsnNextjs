'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './cStyle.css'
import { VscSearch } from "react-icons/vsc";


export default function Search() { 

    const router = useRouter()
    const [ isFocused, setIsFocused ] = useState(false);
    const [idItem, setIdItem] = useState('');
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 

        if(idItem === '') return

        //navigate to the [id] route with the idItem as the param
        router.push(`/${idItem}`)

    }

    return ( 
        <div className='searchContainer'>

            <div className='mediaTypeContainer'>
                <div 
                    onClick={() => setMediaType('image')} 
                    className={ mediaType === 'image' ? 'mediaTypeBtn active' : 'mediaTypeBtn'}
                >
                    Image
                </div>
                <div 
                    onClick={() => setMediaType('video')} 
                    className={ mediaType === 'video' ? 'mediaTypeBtn active' : 'mediaTypeBtn'}
                >
                    Video
                </div>
            </div>

            <form 
                className={`form-container ${isFocused ? 'focused' : ''}`}
                onSubmit={handleSubmit}>
                <input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    type="text"
                    placeholder={`Enter ${mediaType === 'image' ? 'an image' : 'a video'} id to verify`}
                    value={idItem}
                    onChange={(e) => setIdItem(e.target.value)}
                />
                <button  
                    type="submit" 
                    >
                    <VscSearch />
                    <span className="searchBtntext">Search</span>
                </button>
            </form>
        </div>
    )
}
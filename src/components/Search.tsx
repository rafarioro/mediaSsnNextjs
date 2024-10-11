'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './cStyle.css'
import { VscSearch } from "react-icons/vsc";
import { IoImageOutline } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";

export default function Search() { 

    const router = useRouter()
    const [ isFocused, setIsFocused ] = useState(false);
    const [idItem, setIdItem] = useState('');
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 

        if(idItem === '') return 
        //navigate to the [id] route with the idItem as the param
        router.push(`/${mediaType}/${idItem}`)

    }

    return ( 
        <div className='searchContainer'>

            <div className='mediaTypeContainer'>
                <div 
                    onClick={() => setMediaType('image')} 
                    className={ mediaType === 'image' ? 'mediaTypeBtn active' : 'mediaTypeBtn'}
                >
                    <IoImageOutline size={23} style={{ marginRight: '9px' }} />
                    Image
                </div>
                <div 
                    onClick={() => setMediaType('video')} 
                    className={ mediaType === 'video' ? 'mediaTypeBtn active' : 'mediaTypeBtn'}
                >
                    <MdVideoLibrary size={23} style={{ marginRight: '9px' }} />
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
                    <span className="searchBtntext">
                        Verify {mediaType === 'image' ? 'Image' : 'Video'}
                    </span>
                </button>
            </form>
        </div>
    )
}
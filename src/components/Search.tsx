'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './cStyle.css' 
import { IoImageOutline } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
// import sessionStorage from 'node:sessionStorage'


export default function Search() { 

    const router = useRouter()
    const [ isFocused, setIsFocused ] = useState(false);
    const [idItem, setIdItem] = useState('');
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'none'>(window.sessionStorage.getItem('type') ? window.sessionStorage.getItem('type') as 'image' | 'video' : 'none');
    const [error, setError] = useState<string>('')

    const handleSelectMediaType = (type: 'image' | 'video') => {
        setMediaType(type)
        window.sessionStorage.setItem('type', type)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 

        // if the idItem is not a type of BSON ObjectId, return
        // if(!idItem.match(/^[0-9a-fA-F]{24}$/)) return

        if(idItem === '') return 
        //navigate to the [id] route with the idItem as the param
        router.push(`/${mediaType}/${idItem}`)

    }

    const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {

        const searchVal = e.target.value;
        
        // dont allow the user to enter spaces
        if(searchVal.includes(' ')){ 
            // trim to remove the spaces
            const trimmedVal = searchVal.trim()
            setIdItem(trimmedVal)
            return
        }

        if(searchVal.at(-1) === ' '){ 
            return
        }
 
        // dont allow the special characters
        if(searchVal.match(/[^a-zA-Z0-9]/)){
            console.log('special characters')
            setError('Special characters are not allowed')
            return
        }
        

        if(error !== ''){
            setError('')
        } 
 
        setIdItem(e.target.value)
        
    }

    return ( 
        <div className='searchContainer'>

            <div className='mediaTypeContainer'>

                {
                    mediaType === 'none' &&
                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '10px', 
                    }}
                    >
                        <span style={{ marginRight: '10px' }}>Select</span>
                        <FaArrowRightLong size={20}  />
                    </div>
                } 

                <div 
                    onClick={() => handleSelectMediaType('image')} 
                    className={ mediaType === 'image' ? 'mediaTypeBtn active' : 'mediaTypeBtn'}
                >
                    <IoImageOutline size={23} style={{ marginRight: '9px' }} />
                    Image
                </div>
                <div 
                    onClick={() => handleSelectMediaType('video')}
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
                    onChange={handleId}
                />
                <button  
                    type="submit" 
                    >
                    <GoVerified color='white' size={20} />
                    <span className="searchBtntext">
                        Verify 
                    </span>
                </button>
            </form>
        </div>
    )
}
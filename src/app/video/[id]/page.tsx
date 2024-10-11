import React from 'react'
import MediaItem from '@/components/MediaItem'
import { IoArrowBackOutline } from "react-icons/io5"; 
import Link from 'next/link'

export default function page({ params }: { params: { id: string } }) {
 

    return (
      <div className='mediaContainer'> 

        <Link href='/' style={{ 
            position: 'absolute', 
            top: '30px', 
            left: '30px',  
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            cursor: 'pointer' 
          }}>
            <IoArrowBackOutline 
            size={30}
            color='#fff'
          />
          Back to Search
        </Link>

        <MediaItem id={params.id} mediaType='video' />
      </div>
    )
  }
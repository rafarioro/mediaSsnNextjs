'use client'
 
import Image from 'next/image'
import "../app/globals.css"
import React, { useState, useEffect } from 'react' 
import Spinner from './Spinner'
import ReactPlayer from 'react-player'

export default function MediaItem({ id }: { id: string }) {
    
    const [mediaLoading, setMediaLoading] = useState<boolean>(true)
    const [mediaType, setMediaType] = useState<'image' | 'video' | ''>('')
    const [typeLoading, setTypeLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const [videoUrl, setVideoUrl] = useState<string>('')
    
    const getMediaType = async () => {
     
        setMediaLoading(true) 
        setTypeLoading(true)

        fetch(`https://imagessnbackend.onrender.com/api/media/gmt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(res => res.json())
        .then(data => {

            if (data.type === 'video') {
                getVideoUrlFromServer()
            }

            setMediaType(data.type)
            setTypeLoading(false)
        })
        .catch(err => {
            console.log(err)
            setMediaLoading(false)
            setError(true)
        }) 
    }

    const getVideoUrlFromServer = async () => {
        fetch(`https://imagessnbackend.onrender.com/api/media/v/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.url)
            setVideoUrl(data.url)
        })
    }

    useEffect(() => {
        getMediaType()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
            <div style={{  position: 'relative',  width: '400px', height: '400px' }}>
                {
                    typeLoading ? 
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Spinner />
                        </div>
                    ) 
                    : mediaType === 'image' ? 
                    (
                        <>
                            <Image  
                                src={`https://imagessnbackend.onrender.com/m/${id}`} 
                                alt={`Image ${id}`}     
                                layout={'fill'}
                                objectFit="contain"  
                                blurDataURL="../../public/loader.png"
                                placeholder="blur"
                                priority={true} 
                                onLoadStart={() => setMediaLoading(true)}
                                onLoad={() => setMediaLoading(false)}
                                />                        
                            {
                                mediaLoading &&
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <Spinner />
                                </div>
                            }

                        </>
                    )  
                     : mediaType === 'video' && videoUrl !== '' ?
                     (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '700px', width: '500px' }}>
                                <ReactPlayer 
                                    url={videoUrl} 
                                    width='100%'
                                    height='100%'
                                    controls={true} 
                                    />     
                        
                            </div>
                            {/* {
                                mediaLoading &&
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <Spinner />
                                </div>
                            } */}
                        </>
                    )
                    : 
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#fff' }}>
                            <p style={{ fontSize: '20px',  color: '#fff' }}>Error loading media {error}</p>
                        </div>
                    )
                }
            </div>

            <div>
                {
                    JSON.stringify(mediaType)
                }
            </div>

        </div>
    )
}
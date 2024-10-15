'use client'
 
import Image from 'next/image'
import "../app/globals.css"
import React, { useState, useEffect } from 'react' 
import Spinner from './Spinner'
import ReactPlayer from 'react-player' 
import { useRouter } from 'next/navigation'
import { TbListDetails } from "react-icons/tb";
import SpinnerSmall from './SpinnerSmall'
import { FiUser, FiEye, FiInfo  } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import TimeAgo from 'react-timeago'

type ItemData = {
    _id: string,
    type: 'image' | 'video' ,
    data: {
        creator: string,
        createdAt: string,
        description: string,
        views: string[]
    }
}

export default function MediaItem({ id, mediaType }: { id: string, mediaType: 'image' | 'video' }) {
    
    const router = useRouter()
    const [mediaLoading, setMediaLoading] = useState<boolean>(true)  
    const [error, setError] = useState<boolean>(false) 
    const [videoUrl, setVideoUrl] = useState<string>('')
    // const [viewDetails, setViewDetails] = useState<boolean>(false)
    const [getItemData, setGetItemData] = useState<'loading' | 'success' | 'error' | 'notStarted'>('notStarted')

    const [itemData, setItemData] = useState<ItemData>({
        _id: '',
        type: mediaType,
        data: {
            creator: '',
            createdAt: '',
            description: '',
            views: []
        }
    })

    const handleViewDetails = () => { 
        getData()
    }

    const handleTryAgain = () => {
        router.push('/')
    }

    const getVideoUrlFromServer = async () => {
        fetch(`https://imagessnbackend.onrender.com/api/media/v/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then(res => res.json())
        .then(data => { setVideoUrl(data.url); setMediaLoading(false) })
        .catch(err => { console.log(err); setError(true) })
    }

    const getData = async () => {
        setGetItemData('loading')
        
        fetch(`https://imagessnbackend.onrender.com/api/media/gmd/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then(res => res.json())
        .then(data => { 
            setItemData(data)
            setGetItemData('success')
        })
        .catch(err => {
            console.log(err)
            setGetItemData('error') 
        }) 
    }   


    useEffect(() => {
        if(mediaType === 'video') {
            getVideoUrlFromServer()
        }
    }, [mediaType])

    useEffect(() => {

        return () => {
            setError(false)
            setGetItemData('notStarted')
            setItemData({
                _id: '',
                type: mediaType,
                data: {
                    creator: '',
                    createdAt: '',
                    description: '',
                    views: []
                }
            })
        }

    }, [])

    return (
        <div className='mediaItemContainer'>  
            <div className={`${mediaType === 'image' ? 'imageItemContainer' : 'videoItemContainer'}`} > 
                {
                    error ?
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#fff' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '20px',  color: '#fff', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>Error. Check the ID or file type
                                <div 
                                    onClick={handleTryAgain}
                                    style={{ marginTop: '30px', cursor: 'pointer', padding: '10px 20px', borderRadius: '15px', backgroundColor: '#0056b3', color: '#fff' }}
                                    >
                                    Try again
                                </div>
                            </div>
                        </div>
                    )
                    : mediaType === 'image' ? 
                    (
                        <div style={{
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '500px',
                            width: '500px', 
                            position: 'relative',
                        }}
                        >
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
                                onError={() => setError(true)} 
                                />                        
                            {
                                mediaLoading &&
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <Spinner />
                                </div>
                            } 
                        </div>
                    )  
                     : mediaType === 'video' && videoUrl !== '' ?
                     (
                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '500px' }}>
                            <ReactPlayer 
                                url={videoUrl} 
                                width='100%'
                                height='100%'
                                controls={true}
                                onError={() => setError(true)}
                                />      
                        </div>  
                    )
                    : error &&
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#fff' }}>
                            <p style={{ fontSize: '20px',  color: '#fff' }}>Error loading media {error}</p>
                        </div>
                    )
                }
            </div> 
            <div className='viewDetails'>
                {
                    !mediaLoading && !error &&
                    (
                        <button 
                            className='viewDetailsBtn' 
                            onClick={handleViewDetails}
                            disabled={getItemData === 'loading' || getItemData === 'success'}
                            >
                                {
                                    getItemData === 'loading' ?
                                    (
                                        <SpinnerSmall />
                                    )
                                    :
                                    (
                                        <>
                                            <TbListDetails   size={20} />
                                            <span className="viewDetailsBtntext">
                                                
                                                {
                                                    getItemData === 'success' ?
                                                    (
                                                        <>
                                                            Details
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            View Details
                                                        </>
                                                    )
                                                }

                                            </span>
                                        </>
                                    )
                                } 
                        </button>
                    )
                }   

                {
                    getItemData === 'loading' ? 
                    (
                        <>
                            <div className='loadingSkeleton' style={{ width: '100px'}}> </div>
                            <div className='loadingSkeleton'> </div>
                            <div className='loadingSkeleton' style={{ height: '50px'}}> </div>
                            <div className='loadingSkeleton'> </div>
                            <div className='loadingSkeleton'> </div>
                        </>
                        
                    )
                    : getItemData === 'success' && 
                    (
                        <div className='itemDataSuccess'>
                            <div className='dataItem'>
                                <FiUser size={30} />
                                {itemData.data.creator}
                            </div>
                            <div className='dataItem'>
                                <CiCalendar size={30} /> 

                                { 
                                    new Date(itemData.data.createdAt).toLocaleString('en-US', { 
                                        timeZone: 'GMT',
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric', 
                                        hour: 'numeric', 
                                        minute: 'numeric', 
                                        second: 'numeric'
                                    })
                                }
                                (GMT) -

                                <TimeAgo date={itemData.data.createdAt} />

                            </div>
                            <div className='description'>
                                <span>
                                    <FiInfo size={30} />
                                </span>
                                
                                <span >
                                    {itemData.data.description}
                                </span>
                            </div>
                            <div className='dataItem'>
                                <FiEye size={30} />
                                {itemData.data.views.length > 0 ? itemData.data.views.length : 'No Views'}
                            </div>
                        </div>
                    )
                }

            </div>  
        </div>
    )
}
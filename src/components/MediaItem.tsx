'use client'

import React from 'react'

export default function MediaItem({ id }: { id: string }) {
    return (
        <div> 
            <p>ID: {id}</p>
        </div>
    )
}
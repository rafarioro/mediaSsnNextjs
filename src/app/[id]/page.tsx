import React from 'react'
import MediaItem from '@/components/MediaItem'

export default function page({ params }: { params: { id: string } }) {
    return (
      <div>
        <h1>Media Item</h1>
        <MediaItem id={params.id} />
      </div>
    )
  }
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
    return <div>My Post: {params.id}</div>
  }
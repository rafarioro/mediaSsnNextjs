'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './cStyle.css'

export default function Search() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?id=${search}`)
  }

  return (
    <form 
        className='form-container'
        onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter an id to verify"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
        type="submit"
        >
        Search
    </button>
    </form>
  )
}
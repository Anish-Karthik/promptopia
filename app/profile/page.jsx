"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = React.useState([])
  const router = useRouter()
  const fetchPromptData = async () => {
    try {
      const res = await fetch(`/api/users/${session.user.id}/posts`)
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    if(session?.user.id ){
      fetchPromptData()
    }
  }, [session])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {  
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
    if (!hasConfirmed) return
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {method: 'DELETE'})
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      fetchPromptData()
    } catch (e) {
      throw Error(e.message)
    }
  }
  return (
    <Profile 
      name={session?.user.name}
      desc="Welcome to your profile page!"	
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
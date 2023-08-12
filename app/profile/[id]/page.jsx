"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import { useSearchParams, useParams } from 'next/navigation'

const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = React.useState([])

  const router = useRouter()
  const searchParams = useSearchParams()

  const params = useParams()
  const name = searchParams.get('name')


  const fetchPromptData = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/posts`)
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    fetchPromptData(params.id);
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
  if(session?.user.id == params.id) {
    return (
      <Profile 
        name="My"
        desc="Welcome to your profile page!"	
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    )
  } else {
    return (
      <Profile 
        name={name}
        desc={`Welcome to ${name} profile page!`}	
        data={posts}
      />
    )
  }

}

export default MyProfile
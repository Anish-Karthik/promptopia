"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

let flag = false;
const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = React.useState([])
  const router = useRouter()
  console.log("session",session?.user?.id)
  const fetchPromptData = async () => {
    try {
      console.log("fetching", session.user.id)

      const res = await fetch(`/api/users/${session.user.id}/posts`)
      const data = await res.json()
      console.log("data",data)
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

  const handleEdit = async () => {
    
  }
  const handleDelete = async () => {  

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
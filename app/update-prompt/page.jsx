"use client";

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form  from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  // get query params
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [post, setPost] = useState({ 
    prompt: '',
    tag: '' 
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()
        setPost({ prompt: data.prompt, tag: data.tag })
      } catch (error) {
        console.log(error)
      }
    }
    if(promptId) getPromptDetails()
  }, [promptId])

  const editPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      if (!res.ok) throw Error(json.message)

      router.push('/')
    } catch (e) {
      console.log(e)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt
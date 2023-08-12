"use client"

import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = React.useState("")
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {setCopied("")}, 1000)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={() => {router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)}}>
          <Image
            src={post.creator.image}
            alt="Profile Picture"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='text-gray-500 text-sm font-inter'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.prompt?
              "/assets/icons/tick.svg":
              "/assets/icons/copy.svg"}
            alt="Copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient'>
        {post.tag.split(" ").map((tag) => (
          <span>
            <span
              key={tag}
              className=' cursor-pointer'
              onClick={() => handleTagClick && handleTagClick(tag)}
            >
              {tag[0] !== "#" && "#"}{tag}
            </span>
          {" "}
          </span>
        ))}
      </p>
      {session?.user.id === post.creator._id && pathname == `/profile/${session?.user.id}` &&(
        <div className='flex justify-end items-center gap-5 mt-5  '>
          <p className='text-sm font-inter green_gradient  cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='text-sm font-inter orange_gradient cursor-pointer' onClick={handleDelete}>
            delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
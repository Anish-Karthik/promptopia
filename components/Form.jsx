import React from 'react'
import Link from 'next/link'

const Form = ({ handleSubmit, type, post, setPost, submitting}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left blue_gradient'>
        {type} Post
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your amazing prompts with the world, and let your imagination run wild! with AI-powered platform
      </p>
      <form action=""
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
          <textarea
            className='form_textarea'
            placeholder='Write your prompt here...'
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tag
            <span className='text-xs text-gray-500'> (separate with space, eg: #product, #idea, #code)</span>
          </span>
          <input
            className='form_input'
            placeholder='#tag'
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            className='px-5 py-1.5 text-sm rounded-full bg-primary-orange text-white font-semibold'
            disabled={submitting}
            onClick={handleSubmit}
            
          >
            {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
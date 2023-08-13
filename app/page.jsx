"use client"
import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center' >AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia is a community of writers who share and discover AI-generated prompts. Write your killer prompts and share them with the world!
      </p>

      <Feed />
    </section>
  )
}

export default Home
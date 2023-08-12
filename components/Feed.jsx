"use client"
import React from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText, setSearchText] = React.useState('')
  const [posts, setPosts] = React.useState([])
  const handleSearchChange = async (e) => {
  }
  React.useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const res = await fetch('/api/prompt')
        const data = await res.json()
        console.log("data",data)
        setPosts(data)
      } catch (error) { 
        console.log(error)
      }
    }
    fetchPromptData()
    console.log("useEffect")
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          name="search"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          value={searchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick />
      ))}
    </div>
  )
}
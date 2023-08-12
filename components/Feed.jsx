"use client"
import React from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText, setSearchText] = React.useState('')
  const [posts, setPosts] = React.useState([])
  
  async function fetchPromptData (search) {
    try {
      const res = await fetch(`/api/prompt?search=${search}`)
      const data = await res.json()
      if (JSON.stringify(posts) === JSON.stringify(data)) return
      setPosts(data)
    } catch (error) { 
      console.log(error)
    }
  }

  const handleSearchChange =  (e) => {
    setSearchText(e.target.value)
    const search = e.target.value
    // debounce the search function
    debounce(() => {
      // fetch the data
      fetchPromptData(search)
    }, 500)()    
  }
  const handleTagClick = (tag) => {
    fetchPromptData(tag)
  }
  React.useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const res = await fetch('/api/prompt')
        const data = await res.json()
        setPosts(data)
      } catch (error) { 
        console.log(error)
      }
    }
    fetchPromptData()
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
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className='mt-16 prompt_layout'>
      
      { data || data.length>1 ? data.map((post) => (
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))
      : 
      <div className='prompt_card'>
        <div className='flex-center flex-col'>
          <h1 className='text-center'>No prompts found</h1>
          <p className='text-center'>Try searching for something else</p>
        </div>
      </div>
      }
    </div>
  )
}

// A debounce function that returns a new function that can only be called once per given time period
function debounce (func, delay) {
  // Initialize a timer variable
  let timer;
  // Return the new function
  return function () {
    // Get the context and arguments of the function
    let context = this;
    let args = arguments;
    // Clear the previous timer
    clearTimeout (timer);
    // Set a new timer
    timer = setTimeout (function () {
      // Call the original function with the context and arguments
      func.apply (context, args);
    }, delay); // Pass in the delay in milliseconds
  };
}

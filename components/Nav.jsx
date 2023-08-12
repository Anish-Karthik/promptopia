"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex-between w-full mb-16 pt-4'>
      <Link className='flex gap-2 flex-center' href='/'>
        <Image 
          src='/assets/images/logo.svg' 
          alt='Promptopia Logo'
          width={40}
          height={40}
          className='object-contain'
        />
        <p className='logo_text sm:flex hidden'>Promptopia</p>
      </Link>

      {/* desktop layout */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'> 
              Sign out 
            </button>
            <Link href="/profile">
              <ProfilePicture imgLink={session?.user.image} />
            </Link>
          </div>
        ) : (
          <Providers />
        )}
      </div>

      {/* mobile layout */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <ProfilePicture imgLink={session?.user.image} setToggleDropdown={setToggleDropdown} />
            {toggleDropdown && (
              <DropDown setToggleDropdown={setToggleDropdown} />
            )}
          </div>
        ) : (
          <Providers />
        )}
      </div>

    </nav>
  )
}

export default Nav;

function Providers() {
  const [providers, setProviders] = useState(null);
  
  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders();
      setProviders(providersData);
    }
    getProvidersData();
  }, [])

  return (
    <>
      {providers && 
      Object.values(providers).map(provider => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className='black_btn'
        >
          Sign in
        </button>
      ))}
    </>
  )
}

function DropDown({ setToggleDropdown }) {
  return (
    <div className='dropdown'>
      <Link href='/profile'
        className='dropdown_link'
        onClick={() => setToggleDropdown(false)}
      >
        My Profile
      </Link>
      <Link href='/create-prompt'
        className='dropdown_link'
        onClick={() => setToggleDropdown(false)}
      >
        Create Prompt
      </Link>
      <button
        type='button'
        onClick={signOut}
        className='black_btn'
      >
        Sign out
      </button>
    </div>
  )
}

function ProfilePicture({ setToggleDropdown, imgLink }) {
  return (
    <Image
      src={imgLink || "/assets/images/logo.svg"}
      alt="Profile"
      width={37}
      height={37}
      className='rounded-full'
      onClick={() => setToggleDropdown && setToggleDropdown((prev) => !prev)}
    />
  )
}
import React from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: "Promptopia",
  description: "A prompt generator for writers",
  icon: "/assets/images/logo.svg",
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/assets/images/logo.svg" />
      </head>
      <body>
        
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
        
      </body>
    </html>
  )
}

export default RootLayout
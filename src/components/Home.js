import React from 'react'
import Navbar from './Navbar';
export default function Home() {
  return (
    <>
    <Navbar/>
    <div><div className='content-container'>
    <div style={{ 
      position: 'relative',
      height: 'calc(100vh - 64px)', /* subtracting the height of the navbar (64px) */
      backgroundImage: 'url(bg-mit.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }}>
    </div>
  </div></div>
  </>
  )
}
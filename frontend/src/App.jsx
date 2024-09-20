import React, { useState } from 'react'
import 'boxicons'
import './App.css'

function App() {
  return (
    <div className='container'>
      <div className='inputBox'>
        <div className='mapBox'>
        <box-icon name='map' type='solid' color='#ffffff'></box-icon>
          </div>
          <input className='searchInput' placeholder='Enter Your Location'>
          </input>
          <button className='searchBtn'>
          <box-icon name='search' color='#ffffff'></box-icon>
            </button>
      </div>
    </div>
  )
}

export default App

import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContextApi'

const Nav = () => {
    let consumer = useContext(GlobalContext);
    // console.log(consumer);
  return (
    <div>
      <h1>My App</h1>
        <p>{consumer}</p>
    </div>
  )
}

export default Nav

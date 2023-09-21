import React from 'react'
import {Link} from "react-router-dom"
import Policy from './../../pages/Policy';
function Footer() {
  return (
    <div className='footer'>
      <h1 className='text-center'>
        All Right Reserved &copy;GadgetBazaar
      </h1>
      <p className="text-center mt-3">
      <Link to='/about'>About |</Link>
     <Link to='/Contact'>Contact |</Link>
     <Link to='/policy'>Privacy Policy</Link>
      </p>
     
    </div>
  )
}

export default Footer

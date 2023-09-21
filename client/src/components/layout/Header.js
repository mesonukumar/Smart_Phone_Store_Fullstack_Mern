import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {GiShoppingBag} from 'react-icons/gi'
import { useAuth } from '../../context/Auth1'
import { toast } from 'react-toastify';
import Dashboard from './../../pages/user/Dashboard';
import SearchInput from '../form/SearchInput';
import UseCategory from '../../hooks/Usecategory';
import { useCart } from '../../context/Cart1';
import { Badge } from 'antd';
const Header = () => {
  const [auth,setAuth]=useAuth()
  const [cart,setCart]=useCart()
  const categories=UseCategory()
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
    toast.success("Logout Successfully");
  }
  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand" ><GiShoppingBag/>GadgetBazaar</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item"> 
          <NavLink to='/' className="nav-link ">Home</NavLink>
        </li>
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c,i) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
          {!auth.user?(<>
          <li className="nav-item">
          <NavLink to='/register' className="nav-link">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" >
            Login
            </NavLink>
        </li>
          </>):(<>

          <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
     {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${auth?.user?.role===1 ?"admin":"user"}`} className="dropdown-item">Dashboard</NavLink></li>
    <li className="nav-item">
          <NavLink onClick={handleLogout} to='/login'  className="dropdown-item" >
            Logout
            </NavLink>
        </li>
  </ul>
</li>
       </>)
        }
        <li className="nav-item">
        <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
        </li>
       
      </ul>
     
    </div>
  </div>
</nav>

     
    </>
  )
}

export default Header
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (

    <div className='App'>
      <div className='container'>
        <div className='row'>
          <div className='column column-25 sidebar'>
            <h1 className='logo'>Weed Stuff</h1>

            <ul className='nav'>
              <li className='nav__item'>
                <Link to='/' className='nav__link'>Strains</Link>
              </li>
              <li className='nav__item'>
                <Link to='/terpenes' className='nav__link'>Terpenes</Link>
              </li>
            </ul>
          </div>
          <div className='column main'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>

  )
};

export default Layout;
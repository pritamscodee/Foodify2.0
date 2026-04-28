import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Landing from './Landing';

function Layout() {
  const location = useLocation();
  const [show, setshow] = useState(false);
  useEffect(() => {
    if (location.pathname === '/buyer') {
      setshow(false);
    } else {
      setshow(true);
    }
  }, [location.pathname]);
  return (
    <div>
      <Navbar />

      <Outlet />

      {!show && <Landing />}
    </div>
  );
}

export default Layout;

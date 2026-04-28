import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className='min-h-screen bg-blue-50'>
      {/* Navigation Header */}
      <nav className='bg-white border-b-4 border-dashed border-blue-600 shadow-[4px_4px_0px_blue-600]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-8'>
              <h1 className='text-2xl font-bold text-blue-600'>Seller Panel</h1>
              <div className='flex space-x-4'>
                <Link
                  to='/seller/dashboard'
                  className='px-4 py-2 border-2 border-dashed border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-bold transition-colors'
                >
                  Dashboard
                </Link>
                <Link
                  to='/seller/products'
                  className='px-4 py-2 border-2 border-dashed border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-bold transition-colors'
                >
                  Products
                </Link>
                <Link
                  to='/seller/orders'
                  className='px-4 py-2 border-2 border-dashed border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-bold transition-colors'
                >
                  Orders
                </Link>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='px-4 py-2 border-2 border-dashed border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-colors'>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

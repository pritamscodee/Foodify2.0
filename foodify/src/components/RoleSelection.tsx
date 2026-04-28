import { useState, useEffect } from 'react';

function RoleSelection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      navigateToDashboard(savedRole);
    } else {
      setLoading(false);
    }
  }, []);

  const selectRole = (selectedRole: string) => {
    localStorage.setItem('userRole', selectedRole);
    navigateToDashboard(selectedRole);
  };

  const navigateToDashboard = (userRole: string) => {
    if (userRole === 'buyer') {
      window.location.href = '/buyer/foods';
    } else if (userRole === 'seller') {
      window.location.href = '/seller/dashboard';
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-800 flex items-center justify-center'>
        <div className='text-2xl font-bold text-white border-4 border-dashed border-blue-600 p-8 bg-blue-900 shadow-[8px_8px_0px_blue-600] rounded-xl'>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-800'>
      <div className='relative bg-gray-300 border-b-2 border-dashed border-black overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32'>
          <div className='text-center'>
            <h1 className='text-4xl lg:text-6xl font-black text-gray-900 leading-tight mb-8'>
              Welcome to
              <span className='block text-blue-600'>Foodify</span>
            </h1>
            <p className='text-lg lg:text-xl text-gray-700 font-semibold mb-12'>
              Choose your role to get started
            </p>

            {/* Role Selection Cards */}
            <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
              {/* Buyer Card */}
              <div
                onClick={() => selectRole('buyer')}
                className='bg-white p-8 rounded-2xl border-4 border-dashed border-green-600 shadow-[8px_8px_0px_green-600] cursor-pointer hover:scale-105 transition-transform'
              >
                <div className='text-center'>
                  <div className='bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <svg
                      className='w-10 h-10 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l-1.5 9H6.5L5 9z'
                      />
                    </svg>
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    I'm a Buyer
                  </h2>
                  <p className='text-gray-600 mb-6'>
                    Browse delicious foods and place orders from your favorite
                    restaurants
                  </p>
                  <div className='space-y-2 text-left'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Browse food menu
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Place orders easily
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Track deliveries
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>Manage cart</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Card */}
              <div
                onClick={() => selectRole('seller')}
                className='bg-white p-8 rounded-2xl border-4 border-dashed border-blue-600 shadow-[8px_8px_0px_blue-600] cursor-pointer hover:scale-105 transition-transform'
              >
                <div className='text-center'>
                  <div className='bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <svg
                      className='w-10 h-10 text-blue-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                      />
                    </svg>
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    I'm a Seller
                  </h2>
                  <p className='text-gray-600 mb-6'>
                    Manage your restaurant, menu items, and process customer
                    orders
                  </p>
                  <div className='space-y-2 text-left'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Manage menu items
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Process orders
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Track revenue
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Analytics dashboard
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-gray-900 text-center py-8 border-t-2 border-dashed border-black'>
        <div className='space-y-4'>
          <p className='text-gray-400'>
            Already have an account?{' '}
            <button
              onClick={() => (window.location.href = '/login')}
              className='text-blue-400 hover:text-blue-300 underline'
            >
              Login
            </button>
          </p>
          <p className='text-gray-400'>
            Need to create an account?{' '}
            <button
              onClick={() => (window.location.href = '/register')}
              className='text-green-400 hover:text-green-300 underline'
            >
              Register
            </button>
          </p>
          <p className='text-gray-400'>
            Want to switch role?{' '}
            <button
              onClick={() => {
                localStorage.removeItem('userRole');
                window.location.reload();
              }}
              className='text-yellow-400 hover:text-yellow-300 underline'
            >
              Switch Role
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;

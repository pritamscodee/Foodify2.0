import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <div className='min-h-screen bg-gray-800'>
        {/* Hero Section */}
        <section className='relative bg-gray-300 border-b-2 border-dashed border-black overflow-hidden'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32'>
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              {/* Hero Content */}
              <div className='space-y-8'>
                <div className='space-y-4'>
                  <h1 className='text-4xl lg:text-6xl font-black text-gray-900 leading-tight'>
                    Welcome to
                    <span className='block text-blue-600'>Foodify</span>
                  </h1>
                  <p className='text-lg lg:text-xl text-gray-700 font-semibold'>
                    Delicious food delivered to your doorstep
                  </p>
                </div>

                <div className='space-y-4'>
                  <p className='text-gray-700'>
                    Experience the best food in town with premium ingredients
                    and authentic flavors.
                  </p>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Link to='/buyer/foods'>Order Now</Link>

                    <a
                      href='#'
                      className='bg-white text-blue-600 px-8 py-3 rounded-lg font-bold border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 transition-colors inline-flex items-center justify-center'
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-3 gap-6 pt-8'>
                  <div className='text-center bg-white p-4 rounded-lg border-2 border-black shadow-[2px_2px_0px_black]'>
                    <div className='text-2xl font-black text-blue-600'>
                      100+
                    </div>
                    <div className='text-sm text-gray-700 font-semibold'>
                      Food Items
                    </div>
                  </div>

                  <div className='text-center bg-white p-4 rounded-lg border-2 border-black shadow-[2px_2px_0px_black]'>
                    <div className='text-2xl font-black text-blue-600'>5K+</div>
                    <div className='text-sm text-gray-700 font-semibold'>
                      Happy Customers
                    </div>
                  </div>

                  <div className='text-center bg-white p-4 rounded-lg border-2 border-black shadow-[2px_2px_0px_black]'>
                    <div className='text-2xl font-black text-blue-600'>
                      4.9★
                    </div>
                    <div className='text-sm text-gray-700 font-semibold'>
                      Rating
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className='relative'>
                <img
                  src='/burger.png'
                  alt='Food'
                  className='w-full h-auto rounded-2xl border-4 border-black shadow-[4px_4px_0px_black]'
                />
                <div className='absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-black border-2 border-black shadow-lg'>
                  Popular
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-20 bg-gray-600'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl lg:text-4xl font-black text-white mb-4'>
                Why Choose <span className='text-blue-400'>Foodify</span>
              </h2>
              <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
                We're committed to serving the best food with exceptional
                service
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {/* Feature 1 */}
              <div className='text-center bg-gray-300 p-6 rounded-xl border-2 border-black shadow-[3px_3px_0px_black]'>
                <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-black text-gray-900 mb-2'>
                  Fresh Ingredients
                </h3>
                <p className='text-gray-700'>
                  Only the finest ingredients sourced daily
                </p>
              </div>

              {/* Feature 2 */}
              <div className='text-center bg-gray-300 p-6 rounded-xl border-2 border-black shadow-[3px_3px_0px_black]'>
                <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-black text-gray-900 mb-2'>
                  Expert Chefs
                </h3>
                <p className='text-gray-700'>
                  Skilled chefs crafting perfect dishes
                </p>
              </div>

              {/* Feature 3 */}
              <div className='text-center bg-gray-300 p-6 rounded-xl border-2 border-black shadow-[3px_3px_0px_black]'>
                <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-black text-gray-900 mb-2'>
                  Fast Delivery
                </h3>
                <p className='text-gray-700'>
                  Quick delivery without compromising quality
                </p>
              </div>

              {/* Feature 4 */}
              <div className='text-center bg-gray-300 p-6 rounded-xl border-2 border-black shadow-[3px_3px_0px_black]'>
                <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-black text-gray-900 mb-2'>
                  Customer Love
                </h3>
                <p className='text-gray-700'>
                  Thousands of satisfied customers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-20 bg-gray-900 text-center border-t-2 border-dashed border-black'>
          <h2 className='text-3xl font-black text-white mb-4'>
            Ready to Order?
          </h2>
          <p className='text-gray-300 mb-6'>
            Get delicious food delivered fast
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='#'
              className='bg-blue-500 text-white px-8 py-3 rounded-lg border-2 border-black font-black'
            >
              Order Now
            </a>
            <a
              href='#'
              className='bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-black font-black'
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;

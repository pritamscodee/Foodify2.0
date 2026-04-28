import { useDetailsStore } from '../../stores/detailsStore';
import { Button } from '@/components/ui/button';
import { GetCartFoods } from '@/api/api';

function FoodsDeatils() {
  const { details, loading, error } = useDetailsStore();

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen bg-yellow-50'>
        <div className='border-4 border-dashed border-black p-10 rounded-xl shadow-[8px_8px_0px_black] bg-white flex flex-col items-center gap-4'>
          {/* animated dots */}
          <div className='flex space-x-2'>
            <span className='w-3 h-3 bg-black rounded-full animate-bounce'></span>
            <span className='w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:150ms]'></span>
            <span className='w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:300ms]'></span>
          </div>

          {/* text */}
          <h1 className='text-2xl font-black tracking-wide'>
            Loading
            <span className='animate-pulse'>...</span>
          </h1>

          {/* small hint */}
          <p className='text-sm text-gray-600'>
            Please wait, fetching delicious food 🍔
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-2xl font-bold text-red-600 border-4 border-dashed border-red-600 p-8 bg-red-50 shadow-[8px_8px_0px_red-600] rounded-xl'>
          Error: {error}
        </div>
      </div>
    );

  if (!details || !details.data)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-2xl font-bold text-gray-600 border-4 border-dashed border-gray-400 p-8 bg-gray-50 shadow-[8px_8px_0px_gray-400] rounded-xl'>
          No details available
        </div>
      </div>
    );

  function FetchingCartfoods(id: number) {
    GetCartFoods(id);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-4xl font-black mb-10'>🍽️ Food Details</h1>

        {details.data.map((item: any) => (
          <div
            key={item.id}
            className='bg-white rounded-3xl shadow-lg overflow-hidden mb-10 hover:shadow-2xl transition'
          >
            <div className='grid md:grid-cols-2'>
              {/* 🍕 IMAGE */}
              <div className='relative h-[300px] md:h-full'>
                <img
                  src={item.imageUrl || '/placeholder.jpg'}
                  alt={item.name}
                  className='w-full h-full object-cover border-b-indigo-600'
                />

                {/* Price badge */}
                <div className='absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow font-bold text-green-600'>
                  ₹{item.price}
                </div>
              </div>

              {/* 📝 DETAILS */}
              <div className='p-6 flex flex-col justify-between'>
                <div>
                  <h2 className='text-3xl font-bold mb-2'>{item.name}</h2>

                  <p className='text-gray-600 mb-4'>{item.description}</p>

                  {/* Category */}
                  {item.category && (
                    <span className='inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold mb-4'>
                      🍴 {item.category}
                    </span>
                  )}
                </div>

                {/* 🛒 ACTION */}
                <div className='mt-6 flex gap-3'>
                  <Button
                    className='w-50 p-3   hover:rotate-2'
                    onClick={() => FetchingCartfoods(item.id)}
                  >
                    ADD to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodsDeatils;

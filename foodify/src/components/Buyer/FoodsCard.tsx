import { getallProducts } from '@/api/api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDetailsStore, useStore } from '@/stores/detailsStore';
function FoodsCard() {
  const [only, setonly] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const { userInput } = useStore();
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getallProducts();
        console.log('get products data from server : ', data);
        setProducts(data.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);
  const search = userInput.name?.toLowerCase().trim() || '';
  const visibleProducts =
    search.length > 0
      ? products.filter(item => item.name.toLowerCase().startsWith(search))
      : products;
  useEffect(() => {
    if (search.length > 0) {
      setonly(true);
    } else {
      setonly(false);
    }
  }, [search]);
  const fetchDetails = useDetailsStore(state => state.fetchDetails);
  async function handleClick(id: number) {
    try {
      await fetchDetails(id);
      setTimeout(() => {
        navigate('/buyer/details');
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {!only &&
            products.map(item => (
              <div
                key={item.id}
                className='
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-sm
          hover:shadow-md
          transition duration-300
        '
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className='h-52 w-full object-cover'
                />

                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-1'>
                    {item.name}
                  </h2>

                  <p className='text-sm text-gray-500 line-clamp-2 mb-2'>
                    {item.description}
                  </p>

                  <p className='text-lg font-bold text-gray-900 mb-3'>
                    ₹{item.price}
                  </p>

                  <Link to='/buyer/details'>
                    <button
                      onClick={() => handleClick(item.id)}
                      className='
                w-full
                bg-black
                text-white
                text-sm
                py-2
                rounded-lg
                hover:bg-gray-800
                transition
              '
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}

          {only &&
            visibleProducts.map(item => (
              <div
                key={item.id}
                className='
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-sm
          hover:shadow-md
          transition
        '
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className='h-52 w-full object-cover'
                />

                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800'>
                    {item.name}
                  </h2>

                  <p className='text-sm text-gray-500 line-clamp-2'>
                    {item.description}
                  </p>

                  <p className='text-lg font-bold text-gray-900 mt-2'>
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default FoodsCard;

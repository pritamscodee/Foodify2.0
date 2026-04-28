import { DeleteCart, fetching_allCarts } from '@/api/api';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { AllorderStore } from '@/stores/OrderStore';

interface CartFoods {
  name: string;
  imageUrl: string;
  id: number;
  category: string;
  price: string;
}

function CartFoods() {
  const [loading, setloading] = useState<'default' | 'loading'>('default');

  const [cart, setcart] = useState<CartFoods[]>([]);

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetching_allCarts();

        setcart(res);

        console.log('all cart items : ', res.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCart();
  }, []);
  const orderit = AllorderStore(s => s.setOrders);

  function handlecartClick() {
    setloading('loading');

    setTimeout(() => {
      setloading('default');
    }, 3000);
  }

  async function handleDelete(id: number) {
    const deletedCart = await DeleteCart(id);

    //setcart(deletedCart.data.data) //this is not a array so map not applicaple

    console.log(deletedCart);
  }

  if (loading == 'loading') {
    return (
      <>
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
          <div className='bg-white px-8 py-6 rounded-2xl shadow-xl flex items-center gap-4 animate-[fadeScaleUp_0.5s_ease-out]'>
            <div className='bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl animate-bounce'>
              ✓
            </div>

            <div>
              <h2 className='text-lg font-bold text-gray-800'>
                Order Successful
              </h2>
              <p className='text-sm text-gray-500'>
                Your food is being prepared 🍔
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='p-6 grid grid-cols-3 gap-6'>
      {cart.map(item => (
        <div key={item.id} className='border p-4 rounded-lg shadow'>
          <img
            src={item.imageUrl}
            alt={item.name}
            className='w-full h-40 object-cover rounded'
          />

          <h2 className='text-lg font-bold mt-2'>{item.name}</h2>
          <p className='text-gray-500'>{item.category}</p>
          <p className='text-green-600 font-semibold'>₹ {item.price}</p>
          <Button
            onClick={() => {
              handlecartClick();

              orderit([
                {
                  name: item.name,
                  category: item.category,
                  price: item.price,
                },
              ]);
            }}
          >
            Order now
          </Button>

          <Button onClick={() => handleDelete(item.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}

export default CartFoods;

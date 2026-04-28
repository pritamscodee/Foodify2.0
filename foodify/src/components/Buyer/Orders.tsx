import { useEffect } from 'react';
import { AllorderStore } from '../../stores/OrderStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Orders() {
  const { orders, setOrders } = AllorderStore();

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          setOrders(parsedOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  const handleClearOrders = () => {
    setOrders([]);
    localStorage.removeItem('orders');
  };

  if (orders.length === 0) {
    return (
      <div className='min-h-screen bg-yellow-50 p-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold border-b-4 border-dashed border-black pb-4 inline-block mb-8'>
              Your Orders
            </h1>
            <div className='text-2xl font-bold text-gray-600 border-4 border-dashed border-gray-400 p-8 bg-gray-50 shadow-[8px_8px_0px_gray-400] rounded-xl'>
              No orders found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-yellow-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold border-b-4 border-dashed border-black pb-4 inline-block'>
            Your Orders
          </h1>
          <Button
            onClick={handleClearOrders}
            className='border-4 border-dashed border-red-600 text-red-600 bg-red-50 hover:bg-red-100 shadow-[4px_4px_0px_red-600] rounded-xl font-bold'
          >
            Clear All Orders
          </Button>
        </div>

        {/* Orders List */}
        <div className='space-y-6'>
          {orders.map((order, index) => (
            <Card
              key={index}
              className='border-4 border-dashed border-black shadow-[8px_8px_0px_black] rounded-xl bg-white overflow-hidden'
            >
              <CardContent className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                  {/* Order Info */}
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold text-black'>
                      Order #{index + 1}
                    </h3>
                    <h4 className='text-lg font-semibold text-gray-800'>
                      {order.name || 'Unknown Item'}
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Category: {order.category || 'N/A'}
                    </p>
                  </div>

                  {/* Price */}
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-green-700 border-4 border-dashed border-green-700 px-4 py-2 bg-green-50 shadow-[4px_4px_0px_green-700] rounded-lg'>
                      ₹{order.price || '0'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2 justify-end'>
                    <Button
                      variant='outline'
                      className='border-4 border-dashed border-black hover:bg-yellow-100 shadow-[4px_4px_0px_black] rounded-xl font-bold'
                    >
                      Track Order
                    </Button>
                    <Button className='border-4 border-dashed border-black bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_black] rounded-xl font-bold'>
                      Reorder
                    </Button>
                  </div>
                </div>

                {/* Order Status */}
                <div className='mt-4 pt-4 border-t-4 border-dashed border-black'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-bold text-gray-600'>
                      Order Status:
                    </span>
                    <span className='text-sm font-bold px-3 py-1 border-2 border-dashed border-green-600 text-green-600 bg-green-50 rounded'>
                      Delivered
                    </span>
                  </div>
                  <div className='mt-2 text-xs text-gray-500'>
                    Placed on: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className='mt-8 border-4 border-dashed border-black shadow-[8px_8px_0px_black] rounded-xl bg-purple-50'>
          <CardContent className='p-6'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='text-xl font-bold text-black'>Order Summary</h3>
                <p className='text-gray-600'>Total Orders: {orders.length}</p>
              </div>
              <div className='text-right'>
                <div className='text-3xl font-bold text-purple-700'>
                  Total: ₹
                  {orders.reduce(
                    (sum, order) => sum + parseFloat(order.price || '0'),
                    0
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Orders;

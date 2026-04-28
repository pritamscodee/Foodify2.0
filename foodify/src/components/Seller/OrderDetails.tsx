import { useEffect } from 'react';
import { AllorderStore } from '../../stores/OrderStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function OrderDetails() {
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
        console.error('Error fetching seller orders:', error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  const handleUpdateStatus = (orderId: number, status: string) => {
    console.log(`Updating order ${orderId} to status: ${status}`);
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.price || '0'),
    0
  );
  const totalOrders = orders.length;

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold border-b-4 border-dashed border-blue-600 pb-4 inline-block'>
            Order Details
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card className='border-4 border-dashed border-green-600 shadow-[8px_8px_0px_green-600] rounded-xl bg-green-50'>
            <CardContent className='p-6 text-center'>
              <h3 className='text-lg font-bold text-green-800 mb-2'>
                Total Orders
              </h3>
              <div className='text-4xl font-bold text-green-700'>
                {totalOrders}
              </div>
            </CardContent>
          </Card>

          <Card className='border-4 border-dashed border-purple-600 shadow-[8px_8px_0px_purple-600] rounded-xl bg-purple-50'>
            <CardContent className='p-6 text-center'>
              <h3 className='text-lg font-bold text-purple-800 mb-2'>
                Total Revenue
              </h3>
              <div className='text-4xl font-bold text-purple-700'>
                ₹{totalRevenue}
              </div>
            </CardContent>
          </Card>

          <Card className='border-4 border-dashed border-orange-600 shadow-[8px_8px_0px_orange-600] rounded-xl bg-orange-50'>
            <CardContent className='p-6 text-center'>
              <h3 className='text-lg font-bold text-orange-800 mb-2'>
                Avg Order Value
              </h3>
              <div className='text-4xl font-bold text-orange-700'>
                ₹
                {totalOrders > 0
                  ? (totalRevenue / totalOrders).toFixed(2)
                  : '0'}
              </div>
            </CardContent>
          </Card>
        </div>

        {orders.length === 0 ? (
          <div className='text-center'>
            <div className='text-2xl font-bold text-gray-600 border-4 border-dashed border-gray-400 p-8 bg-gray-50 shadow-[8px_8px_0px_gray-400] rounded-xl'>
              No orders found
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order, index) => (
              <Card
                key={index}
                className='border-4 border-dashed border-blue-600 shadow-[8px_8px_0px_blue-600] rounded-xl bg-white overflow-hidden'
              >
                <CardContent className='p-6'>
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-start'>
                    <div className='md:col-span-2'>
                      <div className='flex items-center gap-3 mb-3'>
                        <h3 className='text-xl font-bold text-black'>
                          Order #{index + 1}
                        </h3>
                        <span className='text-sm bg-green-100 px-2 py-1 border-2 border-dashed border-green-600 text-green-700 rounded font-bold'>
                          Confirmed
                        </span>
                      </div>
                      <h4 className='text-lg font-semibold text-gray-800 mb-2'>
                        {order.name}
                      </h4>
                      <p className='text-gray-600 mb-1'>
                        Category: {order.category}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Order Date: {new Date().toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <div className='text-2xl font-bold text-green-700 mb-4'>
                        ₹{order.price}
                      </div>
                      <div className='text-sm text-gray-600'>
                        <p className='mb-1'>Customer: John Doe</p>
                        <p className='mb-1'>Email: john@example.com</p>
                        <p>Phone: +1234567890</p>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Button
                        className='border-4 border-dashed border-blue-600 bg-blue-600 text-white hover:bg-blue-700 shadow-[2px_2px_0px_blue-600] rounded-xl font-bold'
                        onClick={() => handleUpdateStatus(index, 'processing')}
                      >
                        Process
                      </Button>
                      <Button
                        className='border-4 border-dashed border-green-600 bg-green-600 text-white hover:bg-green-700 shadow-[2px_2px_0px_green-600] rounded-xl font-bold'
                        onClick={() => handleUpdateStatus(index, 'completed')}
                      >
                        Complete
                      </Button>
                      <Button
                        className='border-4 border-dashed border-yellow-600 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 shadow-[2px_2px_0px_yellow-600] rounded-xl font-bold'
                        onClick={() => handleUpdateStatus(index, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className='mt-6 pt-6 border-t-4 border-dashed border-blue-600'>
                    <h4 className='font-bold text-lg mb-3'>Order Timeline</h4>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-3'>
                        <div className='w-4 h-4 bg-green-600 border-2 border-dashed border-black rounded-full'></div>
                        <span className='text-sm'>
                          Order Placed - {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='w-4 h-4 bg-blue-600 border-2 border-dashed border-black rounded-full'></div>
                        <span className='text-sm'>
                          Order Confirmed - {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='w-4 h-4 bg-gray-400 border-2 border-dashed border-black rounded-full'></div>
                        <span className='text-sm text-gray-500'>
                          Pending Processing
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className='mt-8 flex justify-center gap-4'>
          <Button
            className='border-4 border-dashed border-blue-600 bg-blue-600 text-white hover:bg-blue-700 shadow-[4px_4px_0px_blue-600] rounded-xl font-bold'
            onClick={() => console.log('Export to CSV')}
          >
            Export to CSV
          </Button>
          <Button
            className='border-4 border-dashed border-green-600 bg-green-600 text-white hover:bg-green-700 shadow-[4px_4px_0px_green-600] rounded-xl font-bold'
            onClick={() => console.log('Print Orders')}
          >
            Print Orders
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;

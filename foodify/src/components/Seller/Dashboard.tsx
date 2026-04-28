import { useEffect, useState } from 'react';
import { getSellerProducts } from '../../api/api';
import { AllorderStore } from '../../stores/OrderStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { orders } = AllorderStore();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const productsData = await getSellerProducts();
        setProducts(productsData.data || []);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.price || '0'),
    0
  );
  const totalProducts = products.length;

  if (loading) {
    return (
      <div className='min-h-screen bg-blue-50 p-8'>
        <div className='flex justify-center items-center'>
          <div className='text-2xl font-bold border-4 border-dashed border-blue-600 p-8 bg-blue-100 shadow-[8px_8px_0px_blue-600] rounded-xl'>
            Loading Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold border-b-4 border-dashed border-blue-600 pb-4 inline-block'>
            Seller Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card className='border-4 border-dashed border-green-600 shadow-[8px_8px_0px_green-600] rounded-xl bg-green-50'>
            <CardContent className='p-6 text-center'>
              <h3 className='text-lg font-bold text-green-800 mb-2'>
                Total Products
              </h3>
              <div className='text-4xl font-bold text-green-700'>
                {totalProducts}
              </div>
            </CardContent>
          </Card>

          <Card className='border-4 border-dashed border-purple-600 shadow-[8px_8px_0px_purple-600] rounded-xl bg-purple-50'>
            <CardContent className='p-6 text-center'>
              <h3 className='text-lg font-bold text-purple-800 mb-2'>
                Total Orders
              </h3>
              <div className='text-4xl font-bold text-purple-700'>
                {orders.length}
              </div>
            </CardContent>
          </Card>

          <Card className='border-4 border-dashed border-orange-600 shadow-[8px_8px_0px_orange-600] rounded-xl bg-orange-50'>
            <CardContent className='p-6 text-center'>
              <h3 className='text-lg font-bold text-orange-800 mb-2'>
                Total Revenue
              </h3>
              <div className='text-4xl font-bold text-orange-700'>
                ₹{totalRevenue}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <Card className='border-4 border-dashed border-blue-600 shadow-[8px_8px_0px_blue-600] rounded-xl bg-white'>
          <CardHeader className='border-b-4 border-dashed border-blue-600'>
            <CardTitle className='text-2xl font-bold'>
              Recent Products
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6'>
            {products.length === 0 ? (
              <div className='text-center text-gray-600 py-8'>
                No products found. Add your first product!
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {products.slice(0, 6).map(product => (
                  <div
                    key={product.id}
                    className='border-4 border-dashed border-gray-400 p-4 bg-gray-50 shadow-[4px_4px_0px_gray-400] rounded-xl'
                  >
                    <img
                      src={product.imageUrl || '/placeholder.jpg'}
                      alt={product.name}
                      className='w-full h-32 object-cover rounded-lg border-2 border-dashed border-gray-300 mb-3'
                    />
                    <h4 className='font-bold text-lg mb-1'>{product.name}</h4>
                    <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
                      {product.description}
                    </p>
                    <div className='text-xl font-bold text-green-700'>
                      ₹{product.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Button
            className='border-4 border-dashed border-blue-600 bg-blue-600 text-white hover:bg-blue-700 shadow-[6px_6px_0px_blue-600] rounded-xl py-4 text-lg font-bold'
            onClick={() => (window.location.href = '/seller/products')}
          >
            Manage Products
          </Button>
          <Button
            className='border-4 border-dashed border-purple-600 bg-purple-600 text-white hover:bg-purple-700 shadow-[6px_6px_0px_purple-600] rounded-xl py-4 text-lg font-bold'
            onClick={() => (window.location.href = '/seller/orders')}
          >
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

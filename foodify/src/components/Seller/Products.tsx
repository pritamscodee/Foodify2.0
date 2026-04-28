import { useEffect, useState } from 'react';
import {
  getSellerProducts,
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
} from '../../api/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getSellerProducts();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await updateSellerProduct({ ...formData, id: editingProduct.id });
      } else {
        await createSellerProduct(formData);
      }
      setEditingProduct(null);
      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this product?')) {
      try {
        await deleteSellerProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const startEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowCreateForm(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-blue-50 p-8 flex items-center justify-center'>
        <div className='text-2xl font-bold border-4 border-dashed border-blue-600 p-8 bg-blue-100 shadow-[8px_8px_0px_blue-600] rounded-xl'>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold border-b-4 border-dashed border-blue-600 pb-4'>
            Products
          </h1>
          <Button
            onClick={() => setShowCreateForm(true)}
            className='border-4 border-dashed border-green-600 bg-green-600 text-white hover:bg-green-700 shadow-[4px_4px_0px_green-600] rounded-xl font-bold'
          >
            Add Product
          </Button>
        </div>

        {(showCreateForm || editingProduct) && (
          <Card className='mb-8 border-4 border-dashed border-blue-600 shadow-[8px_8px_0px_blue-600] rounded-xl bg-white'>
            <CardContent className='p-6'>
              <h3 className='text-xl font-bold mb-4'>
                {editingProduct ? 'Edit Product' : 'New Product'}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <input
                  placeholder='Name'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='border-4 border-dashed border-gray-400 p-3 rounded-xl shadow-[2px_2px_0px_gray-400] focus:outline-none focus:border-blue-600'
                />
                <input
                  placeholder='Price'
                  value={formData.price}
                  onChange={e =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className='border-4 border-dashed border-gray-400 p-3 rounded-xl shadow-[2px_2px_0px_gray-400] focus:outline-none focus:border-blue-600'
                />
                <input
                  placeholder='Category'
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className='border-4 border-dashed border-gray-400 p-3 rounded-xl shadow-[2px_2px_0px_gray-400] focus:outline-none focus:border-blue-600'
                />
                <input
                  placeholder='Image URL'
                  value={formData.imageUrl}
                  onChange={e =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className='border-4 border-dashed border-gray-400 p-3 rounded-xl shadow-[2px_2px_0px_gray-400] focus:outline-none focus:border-blue-600'
                />
              </div>
              <textarea
                placeholder='Description'
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className='w-full mb-4 border-4 border-dashed border-gray-400 p-3 rounded-xl shadow-[2px_2px_0px_gray-400] focus:outline-none focus:border-blue-600 h-24'
              />
              <div className='flex gap-4'>
                <Button
                  onClick={handleSubmit}
                  className='border-4 border-dashed border-green-600 bg-green-600 text-white hover:bg-green-700 shadow-[4px_4px_0px_green-600] rounded-xl font-bold'
                >
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
                <Button
                  onClick={cancelEdit}
                  className='border-4 border-dashed border-red-600 text-red-600 bg-red-50 hover:bg-red-100 shadow-[4px_4px_0px_red-600] rounded-xl font-bold'
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {products.length === 0 ? (
          <div className='text-center text-2xl font-bold text-gray-600 border-4 border-dashed border-gray-400 p-8 bg-gray-50 shadow-[8px_8px_0px_gray-400] rounded-xl'>
            No products found
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map(product => (
              <Card
                key={product.id}
                className='border-4 border-dashed border-blue-600 shadow-[8px_8px_0px_blue-600] rounded-xl bg-white overflow-hidden'
              >
                <img
                  src={product.imageUrl || '/placeholder.jpg'}
                  alt={product.name}
                  className='w-full h-48 object-cover border-b-4 border-dashed border-blue-600'
                />
                <CardContent className='p-4'>
                  <h3 className='text-lg font-bold mb-2'>{product.name}</h3>
                  <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                    {product.description}
                  </p>
                  <div className='flex justify-between items-center mb-3'>
                    <span className='text-xl font-bold text-green-700'>
                      ₹{product.price}
                    </span>
                    <span className='text-sm bg-blue-100 px-2 py-1 border-2 border-dashed border-blue-600 rounded'>
                      {product.category}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      onClick={() => startEdit(product)}
                      className='flex-1 border-4 border-dashed border-yellow-600 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 shadow-[2px_2px_0px_yellow-600] rounded-xl font-bold text-sm'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      className='flex-1 border-4 border-dashed border-red-600 bg-red-50 text-red-700 hover:bg-red-100 shadow-[2px_2px_0px_red-600] rounded-xl font-bold text-sm'
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

import axios from 'axios';

export const api = axios.create({
  baseURL:'https://express4foodify.onrender.com' 
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const authData = JSON.parse(token);
        if (authData.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getallProducts = async () => {
  const res = await api.get('/buyer/get');
  return res.data;
};

export async function getfulldetails(id: number) {
  const resfulldeatils = await api.get(`/buyer/get/${id}`);
  return resfulldeatils.data;
}

export async function GetCartFoods(id: number) {
  const getCartFoods = await api.post(`/buyer/post/cart/${id}`);

  console.log('getcartood.data.data : ', getCartFoods.data.data);
}

export async function fetching_allCarts() {
  const getallcartitems = await api.get('/buyer/get/cart');

  return getallcartitems.data.cart_data;
}

export async function DeleteCart(id: number) {
  return await api.delete(`buyer/del/cart/${id}`);
}

export const getSellerProducts = async () => {
  const res = await api.get('/seller/get');
  return res.data;
};

export const getSellerProductById = async (id: number) => {
  const res = await api.get(`/seller/get/${id}`);
  return res.data;
};

export const createSellerProduct = async (productData: any) => {
  const res = await api.post('/seller/create', productData);
  return res.data;
};

export const updateSellerProduct = async (productData: any) => {
  const res = await api.post('/seller/update', productData);
  return res.data;
};

export const deleteSellerProduct = async (id: number) => {
  const res = await api.delete(`/seller/del/${id}`);
  return res.data;
};

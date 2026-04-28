import { create } from 'zustand';

type OrderedFoods = {
  name: string;
  category: string;
  price: string;
};

type OrderStore = {
  orders: OrderedFoods[];
  setOrders: (data: OrderedFoods[]) => void;
};

export const AllorderStore = create<OrderStore>(set => ({
  orders: [],

  setOrders: data => set({ orders: data }),
}));

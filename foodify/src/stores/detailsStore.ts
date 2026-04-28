import { create } from 'zustand';
import { getfulldetails } from '../api/api';

interface DetailsStore {
  details: any;
  loading: boolean;
  error: string | null;
  fetchDetails: (id: number) => Promise<void>;
  clearDetails: () => void;
}

export const useDetailsStore = create<DetailsStore>(set => ({
  details: null,
  loading: false,
  error: null,

  fetchDetails: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data = await getfulldetails(id);
      set({ details: data, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch details',
        loading: false,
      });
    }
  },

  clearDetails: () => {
    set({ details: null, error: null, loading: false });
  },
}));

interface UserInput {
  name: string;
}

interface Store {
  userInput: UserInput;
  setUserInput: (data: Partial<UserInput>) => void;
  clearUserInput: () => void;
}

export const useStore = create<Store>(set => ({
  userInput: {
    name: '',
  },

  setUserInput: data =>
    set(state => ({
      userInput: {
        ...state.userInput,
        ...data,
      },
    })),

  clearUserInput: () =>
    set({
      userInput: {
        name: '',
      },
    }),
}));

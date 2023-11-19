import { create } from "zustand";

import { type Address } from "wagmi";

import { type Balance } from "./balance.type";

type State = {
  data?: Balance;
  isLoading: boolean;
  error?: string;
};

const initialState: State = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

type Actions = {
  fetchBalance: (params: { address?: Address }) => Promise<void>;
  reset: () => void;
};

export const useBalance = create<State & Actions>()((set, get) => ({
  ...initialState,

  fetchBalance: async ({ address }) => {
    if (!address) {
      return;
    }

    set({ isLoading: true });

    try {
      const data = await (
        await fetch(`/api/balance?address=${address}`)
      ).json();

      set({ data });
    } catch (error) {
      const { message } = error as { message?: string };
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set(initialState),
}));

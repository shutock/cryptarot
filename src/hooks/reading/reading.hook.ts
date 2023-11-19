import { create } from "zustand";

import { type Balance } from "./reading.type";

type State = {
  data?: string;
  isLoading: boolean;
  error?: string;
};

const initialState: State = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

type Actions = {
  read: (params: { cards?: string[]; tokens?: Balance }) => Promise<void>;
  reset: () => void;
};

export const useReading = create<State & Actions>()((set, get) => ({
  ...initialState,

  read: async ({ tokens, cards }) => {
    set({ isLoading: true });

    try {
      const data = await (
        await fetch("/api/reading", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({
              tokens,
              cards,
            }),
          },
        })
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

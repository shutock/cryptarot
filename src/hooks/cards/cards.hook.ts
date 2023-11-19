import { create } from "zustand";

import { cardsList } from "./cards-list";

type State = {
  cards?: string[];
};

const initialState: State = {
  cards: undefined,
};

type Actions = {
  getCards: (params?: { amount?: number }) => void;
  reset: () => void;
};

export const useCards = create<State & Actions>()((set, get) => ({
  ...initialState,

  getCards: (params) => {
    const amount = params?.amount ?? 6;
    let result = [];

    for (let i = 0; i < amount; i++) {
      result.push(cardsList[Math.floor(Math.random() * cardsList.length)]);
    }

    set({ cards: result });
  },

  reset: () => set(initialState),
}));

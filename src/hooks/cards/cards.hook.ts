import { create } from "zustand";

import { cardsList } from ".";

type State = {
  cards?: string[];
};

const initialState: State = {
  cards: undefined,
};

type Actions = {
  getCards: (params?: {
    amount?: number;
    list?: keyof typeof cardsList;
  }) => void;
  reset: () => void;
};

export const useCards = create<State & Actions>()((set, get) => ({
  ...initialState,

  getCards: (params) => {
    const amount = params?.amount ?? 6;
    const list = params?.list ?? "classic";
    let result = [];

    for (let i = 0; i < amount; i++) {
      result.push(
        cardsList[list][Math.floor(Math.random() * cardsList[list].length)]
      );
    }

    set({ cards: result });
  },

  reset: () => set(initialState),
}));

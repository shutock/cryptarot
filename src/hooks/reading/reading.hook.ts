import { create } from "zustand";
import { IBalance } from "..";

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
  read: (params: { cards?: string[]; tokens?: IBalance }) => Promise<void>;
  reset: () => void;
};

export const useReading = create<State & Actions>()((set, get) => ({
  ...initialState,

  read: async ({ tokens, cards }) => {
    set({ isLoading: true });

    const tokenStrings = tokens?.map(({ balance, name, symbol, decimals }) => {
      const value = (Number(balance) / 10 ** decimals).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }
      );
      return `- Token: ${name} (${symbol}), Balance: ${value} ${symbol}`;
    });

    const cardsStrings = cards?.map((card) => `- ${card}`);

    const content = `
  Can you provide me with a relevant advice (what should i sell and buy) for my imaginary token portfolio based on the following tarot spread:

  My crypto portfolio structure:
  ${tokenStrings?.join("\n")}

  My tarot spread:
  ${cardsStrings?.join("\n")}

  BE SPECIFIC!, specify which particular token buy and sell and how much for each (from my portfolio).
  `;

    try {
      const data = await (
        await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content,
              },
            ],
            temperature: 0.7,
          }),
        })
      ).json();

      set({ data: data.choices[0].message.content });
    } catch (error) {
      const { message } = error as { message?: string };
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set(initialState),
}));

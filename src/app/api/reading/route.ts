import { Balance } from "@/hooks";

export const POST = async (request: Request) => {
  const cards = (await request.json())?.cards as string[];
  const tokens = (await request.json())?.tokens as Balance;

  const tokenStrings = tokens.map(({ balance, name, symbol, decimals }) => {
    const value = (Number(balance) / 10 ** decimals).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    return `- Token: ${name} (${symbol}), Balance: ${value} ${symbol}`;
  });

  const cardsStrings = cards.map((card) => `- ${card}`);

  const content = `
  Can you provide me with a relevant advice (what should i sell and buy) for my imaginary token portfolio based on the following tarot spread:

  My crypto portfolio structure:
  ${tokenStrings.join("\n")}

  My tarot spread:
  ${cardsStrings.join("\n")}

  BE SPECIFIC!, specify which particular token buy and sell and how much for each (from my portfolio).
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      stream: false,
      messages: [{ role: "user", content }],
    }),
  });

  const data = await response.json();

  return Response.json(data.choices[0].message.content);
};

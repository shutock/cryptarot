import type { Token } from "@/hooks";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const chains = ["polygon", "eth", "arbitrum", "bsc"];

  let allTokens: { [chain: string]: Token[] } = {};

  for (const chain of chains) {
    // const tokens = (await (
    //   await fetch(
    //     `https://deep-index.moralis.io/api/v2.2/${address}/erc20?chain=${chain}`,
    //     {
    //       headers: {
    //         "X-API-Key": process.env.MORAILS_KEY!,
    //       },
    //     }
    //   )
    // ).json()) as Token[];

    const native = (await (
      await fetch(
        `https://deep-index.moralis.io/api/v2.2/${address}/erc20?chain=${chain}`,
        {
          headers: {
            "X-API-Key": process.env.MORAILS_KEY!,
          },
        }
      )
    ).json()) as Token[];

    const data = [...native];

    allTokens[chain] = data.filter((token) => !token.possible_spam);
  }

  return Response.json(allTokens);
};

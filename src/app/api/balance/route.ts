export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const res = await fetch(
    `https://deep-index.moralis.io/api/v2.2/${address}/erc20?chain=polygon`,
    {
      headers: {
        "X-API-Key": process.env.MORAILS_KEY!,
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
};
